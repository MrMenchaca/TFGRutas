import { Component, Fragment, ReactElement } from "react";

import { Database } from "../../back/database/Database";
import { GoogleMapsMap } from "./components/GoogleMapsMap";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Col, Form, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { IGNMap } from "./components/IGNMap";
import { Coordinate } from "../../back/domain/Coordinate";
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import { Route } from "../../back/domain/Route";
import "../AppStyle.css";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaRoute } from 'react-icons/fa';
import { ListRoute } from "../../back/domain/ListRoute";


interface AllRoutesProps {}

interface AllRoutesState {
    mapRoutes: Route[];
    allRoutes: Route[];
    listsRoutes: ListRoute[];
    center: Coordinate;
    zoom: number;
    mapElement: ReactElement;
    actualMap: string;
}

/**
 * SeeRoute page
 */
export class AllRoutes extends Component<AllRoutesProps, AllRoutesState>{                
    readonly GOOGLE_MAPS = "googleMaps";
    readonly IGN = "ign";
    
    public constructor(props: AllRoutesProps) {
        super(props);
        this.state = {
            mapRoutes: [],
            allRoutes: [],
            listsRoutes: [],
            center: new Coordinate(43.363129, -5.951843, 0),
            zoom: 9,
            mapElement: null,
            actualMap: this.GOOGLE_MAPS
        } 
    }

    public setMap(value: any): void {
        if(value == this.GOOGLE_MAPS){
            this.setState({
                actualMap: this.GOOGLE_MAPS,
                mapElement: null
            }, () => {
                this.setState({
                    actualMap: this.GOOGLE_MAPS,
                    mapElement: <Wrapper apiKey={"AIzaSyDBsrGdH36Y11o4Vx55Ew-0lN_LmL-5G6s"} >
                                    <GoogleMapsMap 
                                    center={this.state.center} 
                                    zoom={this.state.zoom} 
                                    routes={this.state.mapRoutes}
                                    style={"general-map-size"}/>
                                </Wrapper>
                });
            });
        }
        else if(value == this.IGN){
            this.setState({
                actualMap: this.IGN,
                mapElement: null
            }, () => {
                this.setState({
                    actualMap: this.IGN,
                    mapElement: <IGNMap 
                    center={this.state.center} 
                    zoom={this.state.zoom} 
                    routes={this.state.mapRoutes}
                    style={"general-map-size"}/>
                });
            });
        }
    }

    public addRoutes(ids: string[]): void{
        Database.getRoutesByIds(ids).then(routes => {
                //Add routes that don't exist in mapRoutes
                routes.forEach((newRoute) => {
                    if (!this.state.mapRoutes.some(existRoute => existRoute.getId() === newRoute.getId())) 
                        this.state.mapRoutes.push(newRoute);
                })
                
                //Update state
                this.setState({
                    mapRoutes: this.state.mapRoutes
                }, () => {
                    this.setMap(this.state.actualMap);
                    this.updateCheckBoxes(true, ids);
                });
            }
        );
    }

    public removeRoutes(ids: string[]): void{
        //Remove routes
        let aux = this.state.mapRoutes;
        ids.forEach((id => {
            aux = aux.filter(route => { return route.getId() !== id; });
        }))
        
        //Update state
        this.setState({
            mapRoutes: aux
        }, () => {
            this.setMap(this.state.actualMap);
            this.updateCheckBoxes(false, ids);
        });
    }

    public modifyMapRoutes(event: any, ids: string[]): void{
        if(event.target.checked == true)
            this.addRoutes(ids);
        else
            this.removeRoutes(ids);
    }

    public updateCheckBoxes(event: boolean, ids: string[]): void {
        ids.forEach((id) => {
            //Set true/false same routes
            const checkBoxes = document.querySelectorAll('[id*="' + id + '"]') as NodeListOf<HTMLInputElement>;
            checkBoxes.forEach((chk) => {
                chk.checked = event;
            });
            
            //Set false list when, al least, one checkbox of the list is false
            if(event == false){
                checkBoxes.forEach((chk) => {
                    const listCheckBox = document.getElementById("chk-" + chk.id.split("-")[1]) as HTMLInputElement;
                    listCheckBox.checked = false;
                });
            }

            //Set true list when all checkboxes of the list are true
            if(event == true){
                checkBoxes.forEach((chk) => {
                    const listRoutesCheckBoxes = document.querySelectorAll('[id*="chk-' + chk.id.split("-")[1] + '-"]') as NodeListOf<HTMLInputElement>;
                    if(!Array.prototype.slice.call(listRoutesCheckBoxes).some((chk: any) => !chk.checked)){
                        const listCheckBox = document.getElementById("chk-" + chk.id.split("-")[1]) as HTMLInputElement;
                        listCheckBox.checked = true;
                    }
                });
            }
        });
    }

    // ------------------------------------- React methods --------------------------------------------------
    
    public componentDidMount(): void {
        Database.getAllRoutes().then((data) => {
            this.setState({
                allRoutes: data
            });
        });
        Database.getAllListRoutes().then((data) => {
            this.setState({
                listsRoutes: data
            });
        });
        this.setMap(this.state.actualMap);
    }

    public render(): ReactElement {         
        //This "if" is needed to wait until routes are loaded to pass them as params
        if (this.state == null || this.state.allRoutes == [] || this.state.allRoutes == null) {
            return (
                <div>Loading...</div>
            );
        }
        else {
            return (
                <Fragment>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <h1 className="pageTitle">Rutas</h1>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        {/* Sidebar */}
                        <Col xs={4}>
                            <ProSidebar width={"100%"} className={"sideBar"}>
                                <Menu iconShape="square">
                                    {/* All routes */}
                                    <SubMenu 
                                        title="Todas las rutas" 
                                        prefix={<Form.Check 
                                            id={"chk-all"}
                                            aria-label="option 1"
                                            onChange={(e) => this.modifyMapRoutes(e, this.state.allRoutes.map((route) => {return (route.getId());}))}/>}>

                                        {/* Loop to display all routes */}
                                        {this.state.allRoutes.map((route) => {
                                            return (
                                                <Fragment key={"fragment-all-" + route.getId()}>
                                                    <Form.Check 
                                                        id={"chk-all-" + route.getId()}
                                                        label={route.getName()}
                                                        className={"menuItem"}
                                                        onChange={(e) => this.modifyMapRoutes(e, [route.getId()])}/>
                                                </Fragment>
                                            );
                                        })}
                                    </SubMenu>

                                    {/* Loop to display lists */}
                                    {this.state.listsRoutes.map((list) => {
                                            return (
                                                <Fragment key={"fragment-" + list.getId()}>
                                                    <SubMenu 
                                                        title={list.getName()} 
                                                        prefix={<Form.Check
                                                            id={"chk-" + list.getId()}
                                                            aria-label="option 1"
                                                            onChange={(e) => this.modifyMapRoutes(e, list.getRoutes().map((route) => {return (route.getId());}))}/>}>

                                                    {/* Loop to display list routes */}
                                                    {list.getRoutes().map((route) => {
                                                        return (
                                                            <Fragment key={"fragment-" + list.getId() + "-" + route.getId()}>
                                                                <Form.Check 
                                                                    id={"chk-" + list.getId() + "-" + route.getId()}
                                                                    label={route.getName()}
                                                                    className={"menuItem"}
                                                                    onChange={(e) => this.modifyMapRoutes(e, [route.getId()])}/>
                                                            </Fragment>
                                                        );
                                                    })}
                                                    </SubMenu>
                                                </Fragment>
                                            );
                                        })}
                                </Menu>
                            </ProSidebar>
                        </Col>
                        <Col xs={8}>
                            <ToggleButtonGroup type="checkbox" value={[this.GOOGLE_MAPS, this.IGN]} onChange={this.setMap.bind(this)}>
                                <ToggleButton id="tbg-btn-1" value={this.IGN}>GoogleMaps</ToggleButton>
                                <ToggleButton id="tbg-btn-2" value={this.GOOGLE_MAPS}>IGN</ToggleButton>
                            </ToggleButtonGroup>
                            {this.state.mapElement}
                        </Col>
                    </Row>
                </Fragment>
            );
        }
    }
}
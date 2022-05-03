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


interface AllRoutesProps {}

interface AllRoutesState {
    mapRoutes: Route[];
    listRoutes: Route[];
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
            listRoutes: [],
            center: new Coordinate(43.363129, -5.951843, 0),
            zoom: 9,
            mapElement: null,
            actualMap: this.GOOGLE_MAPS
        } 
    }

    public setMap(value: any): any {
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

    public addRoute(id: string): void{
        Database.getRouteById(id).then(data => {
                this.state.mapRoutes.push(data);
                this.setState({
                    mapRoutes: this.state.mapRoutes
                }, () => {
                    this.setMap(this.state.actualMap);
                });
            }
        );
    }

    public removeRoute(id: string): void{
        this.setState({
            mapRoutes: this.state.mapRoutes.filter(route => { return route.getId() !== id; })
        }, () => {
            this.setMap(this.state.actualMap);
        });
    }

    public modifyMapRoutes(event: any, id: string): any{
        if(event.target.checked == true)
            this.addRoute(id);
        else
            this.removeRoute(id);
    }

    // ------------------------------------- React methods --------------------------------------------------
    public componentDidMount(): void {
        Database.getAllRoutes().then((data) => {
            this.setState({
                listRoutes: data
            });
        })
        this.setMap(this.state.actualMap);
    }

    public render(): ReactElement {         
        //This "if" is needed to wait until routes are loaded to pass them as params
        if (this.state == null || this.state.listRoutes == [] || this.state.listRoutes == null) {
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
                        <Col xs={4}>
                            <ProSidebar width={"400px"} breakPoint={"lg"}>
                                <Menu iconShape="square">
                                    <SubMenu title="Todas las rutas" icon={<FaRoute />}>
                                        {this.state.listRoutes.map((route) => {
                                            return (
                                                <Fragment key={"fragment-mi-" + route.getId()}>
                                                    <MenuItem>
                                                        <Form.Check 
                                                            id={"chk-" + route.getId()}
                                                            label={route.getName()}
                                                            onChange={(e) => this.modifyMapRoutes(e, route.getId())}/>
                                                    </MenuItem>
                                                </Fragment>
                                            );
                                        })}
                                    </SubMenu>
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
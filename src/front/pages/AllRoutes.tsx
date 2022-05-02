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


interface AllRoutesProps {}

interface AllRoutesState {
    mapRoutes: Route[];
    listRoutes: ReactElement[];
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
            listRoutes: this.parseRoutesToList(),
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

    public parseRoutesToList(): ReactElement[] {
        const elements: ReactElement[] = [];
        Database.getAllRoutes().then(routes => {
            routes.forEach((route: Route) => {
                elements.push(
                    <Fragment key={route.getId()}>
                        <Form.Check 
                            type="checkbox"
                            id={route.getId()} 
                            defaultChecked={false}
                            label={route.getName()} 
                            onChange={(e) => this.modifyMapRoutes(e, route.getId())}/>
                        {/* <SidebarMenu.Nav.Link onClick={this.hehe}>{route.getName()}</SidebarMenu.Nav.Link><br/> */}
                    </Fragment>
                );
            }, this);
        })
        return elements;
    }

    // ------------------------------------- React methods --------------------------------------------------
    public componentDidMount(): void {
        this.setMap(this.state.actualMap);
    }

    public render(): ReactElement {         
        return (
            <Fragment>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <h1 className="pageTitle">Rutas</h1>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col>
                        <SidebarMenu>
                            <SidebarMenu.Header>
                                <SidebarMenu.Brand>ESTO ES LA LISTA DE RUTAS</SidebarMenu.Brand>
                            </SidebarMenu.Header>
                            <SidebarMenu.Body>
                                <SidebarMenu.Sub>
                                    <SidebarMenu.Sub.Toggle>PRUEBA</SidebarMenu.Sub.Toggle>
                                    <SidebarMenu.Sub.Collapse>
                                        {this.state.listRoutes}
                                    </SidebarMenu.Sub.Collapse>
                                </SidebarMenu.Sub>
                            </SidebarMenu.Body>
                        </SidebarMenu>
                    </Col>
                    <Col>
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
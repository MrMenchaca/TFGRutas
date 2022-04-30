import { Component, Fragment, ReactElement } from "react";
import { Route } from "../../../back/domain/Route";
import { Database } from "../../../back/database/Database";
import { useParams } from "react-router-dom";
import { GoogleMapsMap } from "../GoogleMaps/GoogleMapsMap";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { Col, Row, Spinner, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { IGNMap } from "../IGN/IGNMap";
import { Coordinate } from "../../../back/domain/Coordinate";
import SidebarMenu from 'react-bootstrap-sidebar-menu';

interface AllRoutesProps {}

interface AllRoutesState {
    routes: Route[];
    listRoutes: ReactElement[];
    center: Coordinate;
    zoom: number;
    map: ReactElement;
}

/**
 * SeeRoute page
 */
export class AllRoutes extends Component<AllRoutesProps, AllRoutesState>{            
    googleMapsMap: ReactElement;
    IGNMap: ReactElement;
    
    public constructor(props: AllRoutesProps) {
        super(props);
        this.state = {
            routes: null,
            listRoutes: null,
            center: new Coordinate(43.363129, -5.951843),
            zoom: 9,
            map: null
        }

        Database.getAllRoutes().then(data => 
            this.setState({
                routes: data,
            }, () => {
                this.googleMapsMap = <Wrapper apiKey={"AIzaSyDBsrGdH36Y11o4Vx55Ew-0lN_LmL-5G6s"} render={this.renderMap}>
                                        <GoogleMapsMap center={this.state.center} zoom={this.state.zoom} routes={this.state.routes}/>
                                    </Wrapper>,
                this.IGNMap = <IGNMap center={this.state.center} zoom={this.state.zoom} routes={this.state.routes}/>
                this.setState({
                    map: this.googleMapsMap,
                    listRoutes: this.parseRoutesToList(this.state.routes)
                })
            })
        );
    }

    public handleChange(value: any): any {
        if(value=="googleMaps"){
            this.setState({
                map: this.googleMapsMap
            });
        }
        else if(value=="ign"){
            this.setState({
                map: this.IGNMap
            });
        }
    }

    //Function to return result of calling GoogleMapsApi
    public renderMap(status: Status): React.ReactElement {
        if (status === Status.FAILURE) 
            return <h1>{status}</h1>;
        return <Spinner animation="border"/>;
    }

    public parseRoutesToList(routes: Route[]): ReactElement[] {
        const elements: ReactElement[] = [];
        routes.forEach((route: Route) => {
            elements.push(
                <Fragment key={route.getId()}>
                    <SidebarMenu.Nav.Link onClick={this.hehe}>{route.getName()}</SidebarMenu.Nav.Link><br/>
                </Fragment>
            );
        }, this);
        return elements;
    }

    public hehe(): any{
        console.log("prueba");
    }

    public render(): ReactElement {         
        //This "if" is needed to wait until routes are loaded to pass them as params
        if (this.state == null || this.state.routes == null) {
            return (
                <div className="App">Loading...</div>
            );
        }
        else {
            return (
                <Fragment>
                    <h1>Rutas</h1>
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
                            <ToggleButtonGroup type="checkbox" value={["googleMaps", "ign"]} onChange={this.handleChange.bind(this)}>
                                <ToggleButton id="tbg-btn-1" value={"ign"}>GoogleMaps</ToggleButton>
                                <ToggleButton id="tbg-btn-2" value={"googleMaps"}>IGN</ToggleButton>
                            </ToggleButtonGroup>
                            {this.state.map}
                        </Col>
                    </Row>
                </Fragment>
            );
        }
    }
}
import { Component, Fragment, ReactElement } from "react";
import { Route } from "../../back/domain/Route";
import { Database } from "../../back/database/Database";
import { useParams } from "react-router-dom";
import { GoogleMapsMap } from "./components/GoogleMapsMap";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { Spinner, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { IGNMap } from "./components/IGNMap";
import { Coordinate } from "../../back/domain/Coordinate";
import * as d3 from "d3";
import Chart from "./components/Chart";
import "../AppStyle.css";


interface SeeRouteProps {
    id: string
}

interface SeeRouteState {
    routes: Route[];
    center: Coordinate;
    zoom: number;
    map: ReactElement;
}

/**
 * SeeRoute page
 */
export class SeeRoute extends Component<SeeRouteProps, SeeRouteState>{            
    public constructor(props: SeeRouteProps) {
        super(props);
        this.state = {
            routes: null,
            center: null,
            zoom: null,
            map: null
        };
    }

    public componentDidMount(): void {
        Database.getRouteById(this.props.id).then(data =>
            this.setState({
                routes: [data],
                center: data.getCenter(),
                zoom: 13,
            }, () => {
                this.setState({
                    map: <Wrapper apiKey={"AIzaSyDBsrGdH36Y11o4Vx55Ew-0lN_LmL-5G6s"} render={this.renderMap}>
                            <GoogleMapsMap 
                            center={this.state.center} 
                            zoom={this.state.zoom} 
                            routes={this.state.routes}
                            style={"single-map-size"}/>
                        </Wrapper>
                })
            })
        );
    }

    public handleChange(value: any): any {
        if(value=="googleMaps"){
            this.setState({
                map: <Wrapper apiKey={"AIzaSyDBsrGdH36Y11o4Vx55Ew-0lN_LmL-5G6s"} render={this.renderMap}>
                        <GoogleMapsMap 
                        center={this.state.center} 
                        zoom={this.state.zoom} 
                        routes={this.state.routes}
                        style={"single-map-size"}/>
                    </Wrapper>
            });
        }
        else if(value=="ign"){
            this.setState({
                map: <IGNMap 
                center={this.state.center} 
                zoom={this.state.zoom} 
                routes={this.state.routes}
                style={"single-map-size"}/>
            });
        }
    }

    //Function to return result of calling GoogleMapsApi
    public renderMap(status: Status): React.ReactElement {
        if (status === Status.FAILURE) 
            return <h1>{status}</h1>;
        return <Spinner animation="border"/>;
    }

    public render(): ReactElement {         
        //This "if" is needed to wait until routes are loaded to pass them as params
        if (this.state == null || this.state.routes == null) {
            return (
                <div>Loading...</div>
            );
        }
        else {
            return (
                <Fragment>
                    <h1 className="pageTitle">Ruta {this.state.routes.at(0).getName()}</h1>
                    <ToggleButtonGroup type="checkbox" value={["googleMaps", "ign"]} onChange={this.handleChange.bind(this)}>
                        <ToggleButton id="tbg-btn-1" value={"ign"}>GoogleMaps</ToggleButton>
                        <ToggleButton id="tbg-btn-2" value={"googleMaps"}>IGN</ToggleButton>
                    </ToggleButtonGroup>
                    {this.state.map}
                    <Chart data={this.state.routes.at(0).getElevationProfile()}/>
                </Fragment>
            );
        }
    }
}

/**
 * SeeRouteRouter function/component
 * 
 * This is necessary to use params in ListRoutes.
 * To get params with react-router-dom, we have to use webHooks (useParams() in this case). We
 * can't use webHooks inside class components, so function component is needed.
 */
export function SeeRouteRouter(): ReactElement{
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    const params = useParams();
    const id = params.id;
    return (
        <Fragment>
            <SeeRoute id={id}/>
        </Fragment>
    );
}

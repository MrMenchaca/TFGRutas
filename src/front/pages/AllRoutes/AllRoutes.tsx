import { Component, Fragment, ReactElement } from "react";
import { Route } from "../../../back/domain/Route";
import { Database } from "../../../back/database/Database";
import { useParams } from "react-router-dom";
import { GoogleMapsMap } from "../GoogleMaps/GoogleMapsMap";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { Spinner, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { IGNMap } from "../IGN/IGNMap";
import { Coordinate } from "../../../back/domain/Coordinate";

interface AllRoutesProps {}

interface AllRoutesState {
    routes: Route[];
    center: Coordinate;
    zoom: number;
    map: ReactElement;
}

/**
 * SeeRoute page
 */
export class AllRoutes extends Component<AllRoutesProps, AllRoutesState>{            
    public constructor(props: AllRoutesProps) {
        super(props);
        this.state = {
            routes: null,
            center: null,
            zoom: null,
            map: null
        };
    }

    public componentDidMount(): void {
        Database.getAllRoutes().then(data =>
            this.setState({
                routes: data,
                center: new Coordinate(43.363129, -5.951843),
                zoom: 9,
            }, () => {
                this.setState({
                    map: <Wrapper apiKey={"AIzaSyDBsrGdH36Y11o4Vx55Ew-0lN_LmL-5G6s"} render={this.renderMap}>
                            <GoogleMapsMap center={this.state.center} zoom={this.state.zoom} routes={this.state.routes}/>
                        </Wrapper>
                })
            })
        );
    }

    public handleChange(value: any): any {
        if(value=="googleMaps"){
            this.setState({
                map: <Wrapper apiKey={"AIzaSyDBsrGdH36Y11o4Vx55Ew-0lN_LmL-5G6s"} render={this.renderMap}>
                        <GoogleMapsMap center={this.state.center} zoom={this.state.zoom} routes={this.state.routes}/>
                    </Wrapper>
            });
        }
        else if(value=="ign"){
            this.setState({
                map: <IGNMap center={this.state.center} zoom={this.state.zoom} routes={this.state.routes}/>
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
                <div className="App">Loading...</div>
            );
        }
        else {
            return (
                <Fragment>
                    <h1>Rutas</h1>
                    <ToggleButtonGroup type="checkbox" value={["googleMaps", "ign"]} onChange={this.handleChange.bind(this)}>
                        <ToggleButton id="tbg-btn-1" value={"ign"}>GoogleMaps</ToggleButton>
                        <ToggleButton id="tbg-btn-2" value={"googleMaps"}>IGN</ToggleButton>
                    </ToggleButtonGroup>
                    {this.state.map}
                </Fragment>
            );
        }
    }
}
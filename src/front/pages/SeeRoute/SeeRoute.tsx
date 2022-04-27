import { Component, Fragment, ReactElement } from "react";
import { Route } from "../../../back/domain/Route";
import { Database } from "../../../back/database/Database";
import { useParams } from "react-router-dom";
import { GoogleMapsMap } from "../GoogleMaps/GoogleMapsMap";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { Spinner } from "react-bootstrap";

interface SeeRouteProps {
    id: string
}

interface SeeRouteState {
    routes: Route[];
    center: google.maps.LatLngLiteral;
}

/**
 * SeeRoute page
 */
export class SeeRoute extends Component<SeeRouteProps, SeeRouteState>{            
    public constructor(props: SeeRouteProps) {
        super(props);
        this.state = {
            routes: null,
            center: null
        };
    }

    public componentDidMount(): void {
        Database.getRouteById(this.props.id).then(data =>
            this.setState({
                routes: [data],
                center: data.getGoogleMapsCenter()
            })
        );
    }

    public render(): ReactElement {  
        //Arrow function to return result of calling GoogleMapsApi
        const render = (status: Status): React.ReactElement => {
        if (status === Status.FAILURE) 
            return <h1>{status}</h1>;
        return <Spinner animation="border"/>;
        };

        //Pass zoom to map component
        const zoom = 13;
        
        //This "if" is needed to wait until routes are loaded to pass them as params
        if (this.state == null) {
            return (
                <div className="App">Loading...</div>
            );
        }
        else {
            return (
                <Fragment>
                    <h1>Ruta</h1>
                    <Wrapper apiKey={"AIzaSyDBsrGdH36Y11o4Vx55Ew-0lN_LmL-5G6s"} render={render}>
                        {this.state.routes && <GoogleMapsMap center={this.state.center} zoom={zoom} routes={this.state.routes}/>}
                    </Wrapper>
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
import { Component, Fragment, ReactElement } from 'react';
import 'bootstrap/dist/css/bootstrap'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { GoogleMapsMap } from "./GoogleMapsMap";
import { Spinner } from "react-bootstrap";
  
/**
 * GoogleMaps page
 */
export class GoogleMaps extends Component{  
    public render(): ReactElement {

        //Arrow function to return result of calling GoogleMapsApi
        const render = (status: Status): React.ReactElement => {
        if (status === Status.FAILURE) 
            return <h1>{status}</h1>;
        return <Spinner animation="border"/>;
        };

        //Pass center and zoom to map component
        const center = { lat: 43.363129, lng: -5.951843 };
        const zoom = 8;

        return (
            <Fragment>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <h1>Google Maps</h1>
                        <Wrapper apiKey={"AIzaSyDBsrGdH36Y11o4Vx55Ew-0lN_LmL-5G6s"} render={render}>
                            <GoogleMapsMap center={center} zoom={zoom}/>
                        </Wrapper>
                    </Col>
                </Row> 
            </Fragment>
        );
    }
}
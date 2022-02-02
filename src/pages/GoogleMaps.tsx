import * as React from "react";
import 'bootstrap/dist/css/bootstrap'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { Map } from "../components/Map";
import { Spinner } from "react-bootstrap";
//import {GoogleMap, Marker, InfowWindow, useJsApiLoader} from "@react-google-maps/api"

export class GoogleMaps extends React.Component {

  render() {
    const render = (status: Status): React.ReactElement => {
      if (status === Status.FAILURE) 
        return <h1>{status}</h1>;
      return <Spinner animation="border"/>;
    };

    const center = { lat: -34.397, lng: 150.644 };
    const zoom = 4;

    return (
      <React.Fragment>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h1>Google Maps</h1>
            <Wrapper apiKey={"AIzaSyDBsrGdH36Y11o4Vx55Ew-0lN_LmL-5G6s"} render={render}>
              <Map center={center} zoom={zoom}/>
            </Wrapper>
          </Col>
        </Row> 
      </React.Fragment>
    );
  }
}
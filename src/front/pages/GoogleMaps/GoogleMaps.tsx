import { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { Map } from "./Map";
import { Spinner } from "react-bootstrap";

export class GoogleMaps extends Component {

  render() {
    const render = (status: Status): React.ReactElement => {
      if (status === Status.FAILURE) 
        return <h1>{status}</h1>;
      return <Spinner animation="border"/>;
    };

    const center = { lat: -34.397, lng: 150.644 };
    const zoom = 4;

    console.log(process.env.GOOGLE_MAPS_API_KEY);

    return (
      <Fragment>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h1>Google Maps</h1>
            <Wrapper apiKey={process.env.GOOGLE_MAPS_API_KEY} render={render}>
              <Map center={center} zoom={zoom}/>
            </Wrapper>
          </Col>
        </Row> 
      </Fragment>
    );
  }
}
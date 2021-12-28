import * as React from "react";
import 'bootstrap/dist/css/bootstrap'
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type MapProps = {};

type MapState = {
};

export class Map extends React.Component<MapProps, MapState> {
  state: MapState = {};

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h1>MAPA</h1>
          </Col>
        </Row> 
      </Container>
    );
  }
}
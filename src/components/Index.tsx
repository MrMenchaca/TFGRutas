import * as React from "react";
import 'bootstrap/dist/css/bootstrap'
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

type IndexProps = {};

type IndexState = {
};

export class Index extends React.Component<IndexProps, IndexState> {
  state: IndexState = {};

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h1>TFGRutas</h1>
          </Col>
        </Row> 
        <Row className="justify-content-md-center ">
          <Col md="auto">
            <Link className="btn btn-outline-primary" to="googleMaps">Google maps</Link>
          </Col>
          <Col md="auto">
            <Link className="btn btn-outline-primary" to="googleMaps">IGN</Link>
          </Col>
        </Row> 
      </Container>
    );
  }
}
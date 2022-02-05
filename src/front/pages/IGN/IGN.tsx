import { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
  
/**
 * IGN (Instituto Geográfico Nacional) page
 */
export class IGN extends Component{  
  render() {
    return (
      <Fragment>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h1>Instituto Geográfico Nacional</h1>
          </Col>
        </Row> 
      </Fragment>
    );
  }
}
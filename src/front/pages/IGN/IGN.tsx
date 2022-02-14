import { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IGNMap } from './IGNMap';
  
/**
 * IGN (Instituto Geográfico Nacional) page
 */
export class IGN extends Component{  
  render() {
    const divStyle={
      height: '800px', 
      width: '1000px'
    }

    return (
      <Fragment>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h2>My Map</h2>
            <IGNMap/>
          </Col>
        </Row> 
      </Fragment>
    );
  }
}
import { Component, Fragment, ReactElement } from 'react';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

/**
 * Main page
 */
export class Index extends Component {
    public render(): ReactElement {
        return (
            <Fragment>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <h1>TFGRutas</h1>
                        </Col>
                    </Row>  
                </Container>
            </Fragment>
        );
    }
}
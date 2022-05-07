import { Component, Fragment, ReactElement } from 'react';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../AppStyle.css";
import { Button, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { nativeImage } from 'electron';
import path from 'path';


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
                            <h1 className="pageTitle">TFGRutas</h1>
                        </Col>
                    </Row> 
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <Link to="/importer" className="linkCard">
                                <Card className="text-center cardPosition">
                                    <Card.Img variant="top" src={"hehe"}/>
                                    <Card.Body>
                                        <Card.Title>Rutas</Card.Title>  
                                        <Card.Text>Página para importar rutas, visualizarlas individualmente u organizar las existentes en el sistema</Card.Text>
                                    </Card.Body>                                
                                </Card>
                            </Link>
                        </Col>
                        <Col md="auto">
                            <Link to="/allRoutes" className="linkCard">
                                <Card className="text-center cardPosition">
                                    <Card.Img variant="top" src="/images/mapWithRoute.png"/>
                                    <Card.Body>
                                        <Card.Title>Mapa</Card.Title>
                                        <Card.Text>Página para visualizar todas las rutas en un mapa de GoogleMaps o del Insituto Geográfico Nacional</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}
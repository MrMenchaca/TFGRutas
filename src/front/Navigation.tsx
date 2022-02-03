import { Component, Fragment } from 'react';
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";


export class Navigation extends Component{
    render() {
        return (
            <Fragment>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand as={Link} to="/">TFGRutas</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/" >Inicio</Nav.Link>
                            <Nav.Link as={Link} to="googleMaps" >Google maps</Nav.Link>
                            <Nav.Link as={Link} to="googleMaps" >IGN</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </Fragment>
            
        );
    }
}
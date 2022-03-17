import { Component, Fragment, ReactElement } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * Navbar to use in all application
 */
export class Navigation extends Component {
  public render(): ReactElement {
    return (
      <Fragment>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">TFGRutas</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
              <Nav.Link as={Link} to="googleMaps">Google maps</Nav.Link>
              <Nav.Link as={Link} to="ign">IGN</Nav.Link>
              <Nav.Link as={Link} to="importer">Importador</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </Fragment>
    );
  }
}

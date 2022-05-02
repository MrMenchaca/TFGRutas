import { Component, ReactElement } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ListRoute } from "../../../back/domain/ListRoute";
import { Database } from "../../../back/database/Database";

interface AddListRouteModalProps {
    isShow: boolean;
    onHide: any;
    refreshComponent: any;
}

interface AddListRouteModalState {
    nameField: string
}

export class AddListRouteModal extends Component<AddListRouteModalProps, AddListRouteModalState> {
    public constructor(props: AddListRouteModalProps){
        super(props);
        this.state = {
            nameField: ""
        }
    }

    public addList(): void {
        // const listRoute = new ListRoute(name, [new Route("ruta 1", [new Coordinate(1, 2, 3), new Coordinate(100, 202, 3)]), new Route("ruta 2", null), new Route("ruta 3", null)]);
        const listRoute = new ListRoute(this.state.nameField, null);
        Database.saveListRoute(listRoute);
        console.log(document.getElementById("nameField"));
        this.props.onHide();
        this.props.refreshComponent();
    }

    public render(): ReactElement {
        return (
            <Modal show={this.props.isShow}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton onHide={this.props.onHide}>
                    <Modal.Title id="contained-modal-title-vcenter">Nueva lista</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="nameField">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control autoFocus onChange={(e) => this.setState({ nameField: e.target.value })}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>
                        Cerrar
                    </Button>
                    <Button className="bckColor" variant="primary" onClick={(e) => this.addList()}>
                        Crear
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

import { Component, ReactElement } from "react";
import { Button, Modal } from "react-bootstrap";
import { Database } from "../../../back/database/Database";

interface DeleteListRouteModalProps {
    isShow: boolean;
    onHide: any;
    refreshFather: any;
    idRouteToDelete: string;
}

interface DeleteListRouteModalState {}

export class DeleteListRouteModal extends Component<DeleteListRouteModalProps, DeleteListRouteModalState> {
    public constructor(props: DeleteListRouteModalProps){
        super(props);
    }

    public deleteRoute(): void{
        Database.deleteListRoute(this.props.idRouteToDelete);
        this.props.refreshFather();
        this.closeModal();
    }

    public closeModal(): void {
        this.props.onHide();
    }

    public render(): ReactElement {
        return (
            <Modal show={this.props.isShow}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton onHide={this.closeModal.bind(this)}>
                    <Modal.Title id="contained-modal-title-vcenter">Borrar lista</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Estás seguro que deseas borrar la lista del sistema? Esta acción no se puede deshacer</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal.bind(this)}>
                        Cerrar
                    </Button>
                    <Button className="bckColor" variant="primary" onClick={(e) => this.deleteRoute()}>
                        Borrar
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

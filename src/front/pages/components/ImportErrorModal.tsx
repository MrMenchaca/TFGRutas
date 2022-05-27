import { Component, ReactElement } from "react";
import { Button, Modal } from "react-bootstrap";

interface ImportErrorModalProps {
    isShow: boolean;
    onHide: any;
}

interface ImportErrorModalState {}

export class ImportErrorModal extends Component<ImportErrorModalProps, ImportErrorModalState> {
    public constructor(props: ImportErrorModalProps){
        super(props);
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
                    <Modal.Title id="contained-modal-title-vcenter">Formato incorrecto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>El formato de la ruta a importar debe ser .gpx o .tcx</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="bckColor" variant="primary" onClick={this.closeModal.bind(this)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
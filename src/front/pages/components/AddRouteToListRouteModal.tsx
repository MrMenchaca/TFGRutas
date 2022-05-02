import { Component, Fragment, ReactElement } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ListRoute } from "../../../back/domain/ListRoute";
import { Database } from "../../../back/database/Database";

interface AddRouteToListRouteModalProps {
    isShow: boolean;
    onHide: any;
    refreshFather: any;
    idRouteToAdd: string;
}

interface AddRouteToListRouteModalState {
    listRoutes: ListRoute[];
    listRoutesToAdd: any;
}

export class AddRouteToListRouteModal extends Component<AddRouteToListRouteModalProps, AddRouteToListRouteModalState> {
    public constructor(props: AddRouteToListRouteModalProps){
        super(props);
        this.state = {
            listRoutes: null,
            listRoutesToAdd: []
        }
    }

    public addRouteToListRoute(): void {
        Database.getRouteById(this.props.idRouteToAdd).then((data) => {
            Database.addRouteToListsRoute(this.state.listRoutesToAdd, data);
            this.closeModal();
            this.props.refreshFather();
        }); 
    }

    public handleChange(event: any, listRouteId: string): void {
        if(event.target.checked == true)
            this.addListRoute(listRouteId);
        else
            this.removeListRoute(listRouteId);
    }

    public addListRoute(id: string): void {
        this.state.listRoutesToAdd.push(id);
        this.setState({
            listRoutesToAdd: this.state.listRoutesToAdd
        });
    }

    public removeListRoute(id: string): void {
        this.setState({
            listRoutesToAdd: this.state.listRoutesToAdd.filter((actualId: string) => { return actualId !== id; })
        });
    }

    public refreshComponent(): void {
        Database.getAllListRoutes().then(data =>
            this.setState({
                listRoutes: data
            })
        );
    }

    public closeModal(): void {
        this.setState({
            listRoutesToAdd: []
        });
        this.props.onHide();
    }

    public componentDidMount(): void {
         this.refreshComponent()
    }

    public render(): ReactElement {
        //This "if" is needed to wait until routes are loaded to pass them as params
        if (this.state == null || this.state.listRoutes == null) {
            return (
                <div>Loading...</div>
            );
        }
        else {
            return (
                <Modal show={this.props.isShow}
                    onShow={this.refreshComponent.bind(this)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton onHide={this.closeModal.bind(this)}>
                        <Modal.Title id="contained-modal-title-vcenter">Añadir a una lista</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        {this.state.listRoutes.map((listRoute) => {
                            return (
                                <Fragment key={"fragment-" + listRoute.getId()}>
                                    <div key="default-checkbox" className="mb-3">
                                        <Form.Check 
                                            id={"chk-" + listRoute.getId()}
                                            label={listRoute.getName()}
                                            onChange={(e) => {this.handleChange(e, listRoute.getId())}}
                                        />
                                    </div>
                                </Fragment>
                            );
                        })}
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal.bind(this)}>
                            Cerrar
                        </Button>
                        <Button className="bckColor" variant="primary" onClick={(e) => this.addRouteToListRoute()}>
                            Añadir
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        }
    }
}

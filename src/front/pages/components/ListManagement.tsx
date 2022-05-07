import { Component, Fragment, ReactElement } from "react";
import { Col, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import { MdPlaylistAdd, MdOutlineDelete, MdEdit } from 'react-icons/md';
import { Database } from "../../../back/database/Database";
import { ListRoute } from "../../../back/domain/ListRoute";
import { AddListRouteModal } from "./AddListRouteModal";
import { DeleteListRouteModal } from "./DeleteListRouteModal";


interface ListManagementProps {
    changeList: any;
}

interface ListManagementState {
    listRouteslist: ReactElement[];
    isAddModalDisplayed: boolean;
    isDeleteModalDisplayed: boolean;
    idListRouteToDelete: string;
}

export class ListManagement extends Component<ListManagementProps, ListManagementState> {
    public constructor(props: ListManagementProps) {
        super(props);
        this.state = {
            listRouteslist: null,
            isAddModalDisplayed: false,
            isDeleteModalDisplayed: false,
            idListRouteToDelete: ""
        }
    }

    public deleteListRoute(id: string): void{
        Database.deleteListRoute(id);
        this.refreshListRouteList();
    }

    public refreshListRouteList(): void {
        this.parseListRoutesToList().then(data =>
            this.setState({
                listRouteslist: data
            })
        );
    }

    public showAddModal(): void {
        this.setState({
            isAddModalDisplayed: true
        });
    } 
    
    public hideAddModal(): void {
        this.setState({
            isAddModalDisplayed: false
        });
    }

    public showDeleteModal(idListRoute: string): void {
        this.setState({
            idListRouteToDelete: idListRoute,
            isDeleteModalDisplayed: true
        });
    } 
    
    public hideDeleteModal(): void {
        this.setState({
            isDeleteModalDisplayed: false
        });
    }

    public async parseListRoutesToList(): Promise<ReactElement[]> {
        const listRoutes = await Database.getAllListRoutes()
        const elements: ReactElement[] = [];
        listRoutes.forEach((listRoute: ListRoute) => {
            elements.push(
                <Fragment key={listRoute.getId()}>
                    <tr>
                        <td>
                            {listRoute.getName()}
                            <OverlayTrigger
                                placement={"top"}
                                overlay={<Tooltip id={`tooltip-${"top"}`}>Eliminar</Tooltip>}>
                                <span className="iconAction deleteIcon">
                                    <MdOutlineDelete onClick={(e) => {this.showDeleteModal(listRoute.getId())}}/>
                                </span>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement={"top"}
                                overlay={<Tooltip id={`tooltip-${"top"}`}>Editar</Tooltip>}>
                                <span className="iconAction">
                                    <MdEdit onClick={() => this.props.changeList(listRoute.getId())}/>
                                </span>
                            </OverlayTrigger>

                        </td>
                    </tr>
                </Fragment>
            );
        }, this);
        return elements;
    }

    public componentDidMount(): void {
        this.refreshListRouteList();
    }
    
    public render(): ReactElement {
        return (
            <Fragment>
                <Row className="justify-content-md-center">
                    <Col xs={12}>
                        <h3 className="pageTitle" style={{textAlign: "center"}}>
                            Listas
                            <OverlayTrigger
                                placement={"top"}
                                overlay={<Tooltip id={`tooltip-${"top"}`}>Crear lista</Tooltip>}>
                                <span className="iconAction">
                                    <MdPlaylistAdd onClick={this.showAddModal.bind(this)}/>
                                </span>
                            </OverlayTrigger>
                        </h3> 
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={12}>
                        <Table striped bordered hover>
                            <tbody>
                                {this.state.listRouteslist}
                            </tbody> 
                        </Table>
                    </Col>
                </Row>
                <AddListRouteModal 
                    isShow={this.state.isAddModalDisplayed} 
                    onHide={() => this.hideAddModal()}
                    refreshComponent={() => this.refreshListRouteList()}/>
                <DeleteListRouteModal
                        idRouteToDelete={this.state.idListRouteToDelete}
                        isShow={this.state.isDeleteModalDisplayed}
                        onHide={() => this.hideDeleteModal()}
                        refreshFather={() => this.refreshListRouteList()}/>
            </Fragment>
        );
    }
}
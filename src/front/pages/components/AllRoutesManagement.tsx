import { Component, Fragment, ReactElement } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Col, Row, Table } from "react-bootstrap";
import { Database } from "../../../back/database/Database";
import { Route } from "../../../back/domain/Route";
import { MdOutlineDelete, MdOutlineLibraryAdd } from 'react-icons/md';
import { BiShow } from 'react-icons/bi';
import { Link } from "react-router-dom";
import { AddRouteToListRouteModal } from "./AddRouteToListRouteModal";
import { DeleteRouteModal } from "./DeleteRouteModal";


interface AllRoutesManagementProps {}

interface AllRoutesManagementState {
    routes: Route[];
    isAddModalDisplayed: boolean;
    idRouteToAdd: string;
    isDeleteModalDisplayed: boolean;
    idRouteToDelete: string;
}

export class AllRoutesManagement extends Component<AllRoutesManagementProps, AllRoutesManagementState> {
    public constructor(props: AllRoutesManagementProps){
        super(props);
        this.state = {
            routes: null,
            isAddModalDisplayed: false,
            idRouteToAdd: "",
            isDeleteModalDisplayed: false,
            idRouteToDelete: ""
        }
    }

    public refreshRoutesListDroppable(): void {
        Database.getAllRoutes().then(data =>
            this.setState({
                routes: data
            })
        );
    }

    public showAddModal(idRoute: string): void {
        this.setState({
            idRouteToAdd: idRoute,
            isAddModalDisplayed: true
        });
    } 
    
    public hideAddModal(): void {
        this.setState({
            isAddModalDisplayed: false
        });
    }

    public showDeleteModal(idRoute: string): void {
        this.setState({
            idRouteToDelete: idRoute,
            isDeleteModalDisplayed: true
        });
    } 
    
    public hideDeleteModal(): void {
        this.setState({
            isDeleteModalDisplayed: false
        });
    }

    public componentDidMount(): void {
        this.refreshRoutesListDroppable();
    }

    public render(): ReactElement {
        //This "if" is needed to wait until routes are loaded to pass them as params
        if (this.state == null || this.state.routes == null) {
            return (
                <div>Loading...</div>
            );
        }
        else {
            return (
                <Fragment>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <h3 className="pageTitle">Todas las rutas</h3>
                        </Col>
                    </Row> 
                    <Row className="justify-content-md-center">
                        <Table striped bordered hover>
                            <tbody>
                                {this.state.routes.map((route) => {
                                    return (
                                        <Fragment key={"fragment-" + route.getId()}>
                                            <tr>
                                                <td>
                                                    { route.getName() } 
                                                    <span className="iconAction deleteIcon">
                                                        <MdOutlineDelete onClick={(e) => {this.showDeleteModal(route.getId())}}/>
                                                    </span>
                                                    <span className="iconAction">
                                                        <Link className="showIcon" to={"/seeRoute/" + route.getId()}>
                                                            <BiShow/>
                                                        </Link>
                                                    </span>
                                                    <span className="iconAction">
                                                        <MdOutlineLibraryAdd onClick={(e) => {this.showAddModal(route.getId())}}/>
                                                    </span>
                                                </td>
                                            </tr>
                                        </Fragment>
                                    );
                                })}
                            </tbody>
                        </Table>
                        <AddRouteToListRouteModal 
                            idRouteToAdd={this.state.idRouteToAdd}
                            isShow={this.state.isAddModalDisplayed} 
                            onHide={() => this.hideAddModal()}
                            refreshFather={() => this.refreshRoutesListDroppable()}/>
                        <DeleteRouteModal
                            idRouteToDelete={this.state.idRouteToDelete}
                            isShow={this.state.isDeleteModalDisplayed}
                            onHide={() => this.hideDeleteModal()}
                            refreshFather={() => this.refreshRoutesListDroppable()}/>
                    </Row> 
                </Fragment>
            );
        }
    }
}
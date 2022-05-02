import { Component, Fragment, ReactElement } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Col, Row, Table } from "react-bootstrap";
import { Database } from "../../../back/database/Database";
import { Route } from "../../../back/domain/Route";
import { MdOutlineDelete, MdOutlineLibraryAdd } from 'react-icons/md';
import { BiShow } from 'react-icons/bi';
import { Link } from "react-router-dom";
import { AddRouteToListRouteModal } from "./AddRouteToListRouteModal";


interface RoutesManagmentProps {}

interface RoutesManagmentState {
    routes: Route[];
    isModalDisplayed: boolean;
    idRouteToAdd: string
}

export class RoutesManagment extends Component<RoutesManagmentProps, RoutesManagmentState> {
    public constructor(props: RoutesManagmentProps){
        super(props);
        this.state = {
            routes: null,
            isModalDisplayed: false,
            idRouteToAdd: ""
        }
    }

    public deleteRoute(id: string): void{
        Database.deleteRoute(id);
        this.refreshRoutesListDroppable();
    }

    public refreshRoutesListDroppable(): void {
        Database.getAllRoutes().then(data =>
            this.setState({
                routes: data
            })
        );
    }

    public showModal(idRoute: string): void {
        this.setState({
            idRouteToAdd: idRoute,
            isModalDisplayed: true
        });
    } 
    
    public hideModal(): void {
        this.setState({
            isModalDisplayed: false
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
                                                        <MdOutlineDelete onClick={(e) => {this.deleteRoute(route.getId())}}/>
                                                    </span>
                                                    <span className="iconAction">
                                                        <Link className="showIcon" to={"/seeRoute/" + route.getId()}>
                                                            <BiShow/>
                                                        </Link>
                                                    </span>
                                                    <span className="iconAction">
                                                        <MdOutlineLibraryAdd onClick={(e) => {this.showModal(route.getId())}}/>
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
                            isShow={this.state.isModalDisplayed} 
                            onHide={() => this.hideModal()}
                            refreshFather={() => this.refreshRoutesListDroppable()}/>
                    </Row> 
                </Fragment>
            );
        }
    }
}
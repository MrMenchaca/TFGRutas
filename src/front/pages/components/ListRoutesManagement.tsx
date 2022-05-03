import { Component, Fragment, ReactElement } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Database } from "../../../back/database/Database";
import { Route } from "../../../back/domain/Route";
import { MdOutlineDelete, MdOutlineLibraryAdd } from 'react-icons/md';
import { BiShow } from 'react-icons/bi';
import { IoMdArrowBack } from 'react-icons/io';
import { Link } from "react-router-dom";
import { AddRouteToListRouteModal } from "./AddRouteToListRouteModal";
import { ListRoute } from "../../../back/domain/ListRoute";


interface ListRoutesManagementProps {
    idList: string;
    changeList: any;
}

interface ListRoutesManagementState {
    listRoute: ListRoute
    isModalDisplayed: boolean;
    idRouteToAdd: string;
}

export class ListRoutesManagement extends Component<ListRoutesManagementProps, ListRoutesManagementState> {
    public constructor(props: ListRoutesManagementProps){
        super(props);
        this.state = {
            listRoute: null,
            isModalDisplayed: false,
            idRouteToAdd: ""
        }
    }

    public deleteRoute(id: string): void{
        Database.deleteRouteFromListRoute(this.props.idList, id);
        this.refreshRoutesListDroppable();
    }

    public refreshRoutesListDroppable(): void {
        Database.getListRouteById(this.props.idList).then(data => {
            this.setState({
                listRoute: data
            });
        });
    }

    // public showModal(idRoute: string): void {
    //     this.setState({
    //         idRouteToAdd: idRoute,
    //         isModalDisplayed: true
    //     });
    // } 
    
    // public hideModal(): void {
    //     this.setState({
    //         isModalDisplayed: false
    //     });
    // }

    public componentDidMount(): void {
        this.refreshRoutesListDroppable();
    }

    public render(): ReactElement {
        //This "if" is needed to wait until routes are loaded to pass them as params
        if (this.state == null || this.state.listRoute == null) {
            return (
                <div>Loading...</div>
            );
        }
        else {
            return (
                <Fragment>
                    <Row className="justify-content-md-center">
                        <Col>
                            <h3 className="pageTitle" style={{textAlign: "center"}}>
                                <span className="iconAction" style={{float: "left"}}>
                                    <IoMdArrowBack onClick={() => this.props.changeList(null)}/>
                                </span>
                                {this.state.listRoute.getName()}
                            </h3>
                        </Col>
                    </Row> 
                    <Row className="justify-content-md-center">
                        <Table striped bordered hover>
                            <tbody>
                                {this.state.listRoute.getRoutes().map((route) => {
                                    return (
                                        <Fragment key={"fragmentlr-" + route.getId()}>
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
                                                </td>
                                            </tr>
                                        </Fragment>
                                    );
                                })}
                            </tbody>
                        </Table>
                        {/* <AddRouteToListRouteModal 
                            idRouteToAdd={this.state.idRouteToAdd}
                            isShow={this.state.isModalDisplayed} 
                            onHide={() => this.hideModal()}
                            refreshFather={() => this.refreshRoutesListDroppable()}/> */}
                    </Row> 
                </Fragment>
            );
        }
    }
}
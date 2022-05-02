import { Component, Fragment, ReactElement } from "react";
import { Col, Form, Row, Table } from "react-bootstrap";
import { MdPlaylistAdd, MdOutlineDelete } from 'react-icons/md';
import { Route } from "../../../back/domain/Route";
import { Database } from "../../../back/database/Database";
import { ListRoute } from "../../../back/domain/ListRoute";
import { Coordinate } from "../../../back/domain/Coordinate";
import { AddListRouteModal } from "./AddListRouteModal";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

interface ListManagmentProps {}

interface ListManagmentState {
    listRouteslist: ReactElement[];
    isModalDisplayed: boolean;
}

export class ListManagment extends Component<ListManagmentProps, ListManagmentState> {
    public constructor(props: ListManagmentProps) {
        super(props);
        this.state = {
            listRouteslist: null,
            isModalDisplayed: false
        }
    }

    public async parseListRoutesToList(): Promise<ReactElement[]> {
        const listRoutes = await Database.getAllListRoutes()
        const elements: ReactElement[] = [];
        listRoutes.forEach((listRoute: ListRoute) => {
            elements.push(
                <Fragment key={listRoute.getId()}>
                    <tr>
                        <td>{listRoute.getName()}<span className="iconAction deleteIcon"><MdOutlineDelete onClick={(e) => {this.deleteListRoute(listRoute.getId())}}/></span></td>
                    </tr>
                </Fragment>
            );
        }, this);
        return elements;
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

    public handleOnDragEnd(result: any): any{
        console.log("prueba");
    }

    public showModal(): void {
        this.setState({
            isModalDisplayed: true
        });
    } 
    
    public hideModal(): void {
        this.setState({
            isModalDisplayed: false
        });
    }

    public componentDidMount(): void {
        this.refreshListRouteList();
    }
    
    public render(): ReactElement {
        return (
            <Fragment>
                <Row className="justify-content-md-center">
                    <Col xs={12}>
                        <h3 className="pageTitle" style={{textAlign: "center"}}>Listas<span className="iconAction"><MdPlaylistAdd onClick={this.showModal.bind(this)}/></span></h3> 
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
                    isShow={this.state.isModalDisplayed} 
                    onHide={() => this.hideModal()}
                    refreshComponent={() => this.refreshListRouteList()}/>
            </Fragment>
        );
    }
}
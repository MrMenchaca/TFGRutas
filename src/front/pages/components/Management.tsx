import { Component, Fragment, ReactElement } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Col, Container, Row, Table } from "react-bootstrap";
import { ListManagement } from "./ListManagement";
import { ListRoutesManagement } from "./ListRoutesManagement";
import { AllRoutesManagement } from "./AllRoutesManagement";

interface ManagementProps {}

interface ManagementState {
    list: any
}

export class Management extends Component<ManagementProps, ManagementState> {   
    public constructor(props: ManagementProps){
        super(props);
        this.state = {
            list: <AllRoutesManagement/>
        }
    }

    public changeList(idList: string): void{
        if (idList == null)
            this.setState({
                list: null
            },() => {
                this.setState({
                    list: <AllRoutesManagement/>
                });
            });
        else
            this.setState({
                list: null
            },() => {
                this.setState({
                    list: <ListRoutesManagement 
                        idList={idList}
                        changeList={this.changeList.bind(this)}/>
                }); 
            });
    }

    public render(): ReactElement {
        return (
            <Fragment>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <h1 style={{marginTop: "40px"}}>Gestionar</h1>
                        </Col>
                    </Row> 
                    <Row className="justify-content-md-center">
                        <Col>
                            <ListManagement changeList={this.changeList.bind(this)}/>
                        </Col>
                        <Col xs={9}>
                            {this.state.list}
                        </Col>
                    </Row>   
                </Container>
            </Fragment>
        );
    }
}
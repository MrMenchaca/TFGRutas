import { Component, Fragment, ReactElement } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Col, Container, Row, Table } from "react-bootstrap";
import { ListManagment } from "./ListManagment";
import { RoutesManagment } from "./RoutesManagment";

interface ManagementProps {}

interface ManagementState {}

export class Management extends Component<ManagementProps, ManagementState> {
    public constructor(props: ManagementProps){
        super(props);

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
                            <ListManagment/>
                        </Col>
                        <Col xs={9}>
                            <RoutesManagment/>
                        </Col>
                    </Row>   
                </Container>
            </Fragment>
        );
    }
}
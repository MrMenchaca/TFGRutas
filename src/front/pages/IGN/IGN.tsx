import { Component, Fragment, ReactElement } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IGNMap } from './IGNMap';
import { Database } from '../../../back/database/Database';
import { Route } from '../../../back/domain/Route';
  
interface IGNProps {}

interface IGNState {
    routes: Route[];
}

/**
 * IGN (Instituto Geográfico Nacional) page
 */
export class IGN extends Component<IGNProps, IGNState>{  
    public constructor(props: IGNProps){
        super(props);
        this.state = {
            routes: null,
        }
    }
    
    public componentDidMount(): void {
        Database.getAllRoutes().then(data =>
            this.setState({
                routes: data
            })
        );
    }

    public render(): ReactElement {
        //This "if" is needed to wait until routes are loaded to pass them as params
        if (this.state == null || this.state.routes == null) {
            return (
                <div className="App">Loading...</div>
            );
        }
        else {
            return (
                <Fragment>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <h2>My Map</h2>
                            <IGNMap routes={this.state.routes}/>
                        </Col>
                    </Row> 
                </Fragment>
            );
        }
    }
}
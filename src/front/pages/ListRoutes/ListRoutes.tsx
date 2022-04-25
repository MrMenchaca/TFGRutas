import { Component, Fragment, ReactElement } from "react";
import { Route } from "../../../back/domain/Route";
import { Database } from "../../../back/database/Database";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface ListRoutesProps {}

interface ListRoutesState {
    routesNames: ReactElement[];
}

export class ListRoutes extends Component<ListRoutesProps, ListRoutesState>{     
    public constructor(props: ListRoutesProps) {
        super(props);
        this.state = {
            routesNames: null,
        };
    }
    
    public async getRoutes(): Promise<ReactElement[]> {
        const elements: ReactElement[] = [];
        const routes: Route[] = await Database.getAllRoutes();
        routes.forEach(function(route: Route){
            elements.push(
                <Fragment>
                    <li>
                        {route.getName()}
                        <Link to="/seeRoute/5">
                            <Button variant="primary">Ver</Button>
                        </Link>
                    </li>
                </Fragment>
            )
        });
        return elements;
    }
    
    public render(): ReactElement {       
        
        
        this.getRoutes().then(data =>
            this.setState({
                routesNames: data
            })
        );

        return (
            <Fragment>
                <h1>Rutas</h1>
                <ul>{this.state.routesNames}</ul>
            </Fragment>
        );
    }
}
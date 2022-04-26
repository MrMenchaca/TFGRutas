import { Component, Fragment, ReactElement } from "react";
import { Route } from "../../../back/domain/Route";
import { Database } from "../../../back/database/Database";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface ListRoutesProps {}

interface ListRoutesState {
    routes: ReactElement[];
}

/**
 * ListRoutes page
 */
export class ListRoutes extends Component<ListRoutesProps, ListRoutesState>{     
    public constructor(props: ListRoutesProps) {
        super(props);
        this.state = {
            routes: null,
        };
    }
    
    public async getRoutes(): Promise<ReactElement[]> {
        const routes: Route[] = await Database.getAllRoutes();

        //For each route, we create <li> to display it
        const elements: ReactElement[] = [];
        routes.forEach(function(route: Route){
            const link = "/seeRoute/" + route.getId();
            elements.push(
                <Fragment>
                    <li>
                        {route.getName()}
                        <Link to={link}>
                            <Button variant="primary">Ver</Button>
                        </Link>
                    </li>
                </Fragment>
            );
        });
        return elements;
    }
    
    public componentDidMount(): void {
        this.getRoutes().then(data =>
            this.setState({
                routes: data
            })
        );
    }

    public render(): ReactElement {       
        return (
            <Fragment>
                <h1>Rutas</h1>
                <ul>
                    {this.state.routes}
                </ul>
            </Fragment>
        );
    }
}
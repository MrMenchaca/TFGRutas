import { Component, Fragment, ReactElement } from "react";
import { Route } from "../../../back/domain/Route";
import { Database } from "../../../back/database/Database";
import { useParams } from "react-router-dom";

interface SeeRouteProps {
    id: string
}

interface SeeRouteState {
    route: string;
}

/**
 * SeeRoute page
 */
export class SeeRoute extends Component<SeeRouteProps, SeeRouteState>{            
    public constructor(props: SeeRouteProps) {
        super(props);
        this.state = {
            route: null,
        };
    }
    
    private async getRoute(): Promise<Route> {
        return await Database.getRouteById(this.props.id);
    }

    public componentDidMount(): void {
        this.getRoute().then(data =>
            this.setState({
                route: data.getName()
            })
        );
    }

    public render(): ReactElement {  
        return (
            <Fragment>
                <h1>Ruta {this.state.route}</h1>
            </Fragment>
        );
    }
}

/**
 * SeeRouteRouter function/component
 * 
 * This is necessary to use params in ListRoutes.
 * To get params with react-router-dom, we have to use webHooks (useParams() in this case). We
 * can't use webHooks inside class components, so function component is needed.
 */
export function SeeRouteRouter(): ReactElement{
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    const params = useParams();
    const id = params.id;
    return (
        <Fragment>
            <SeeRoute id={id}/>
        </Fragment>
    );
}
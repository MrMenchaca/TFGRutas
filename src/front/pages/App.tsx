import { Component, Fragment, ReactElement } from 'react';
import * as ReactDOM from "react-dom";
import { Route, Routes, HashRouter} from "react-router-dom";
import { Index } from "./Index";
import { Navigation } from "./components/Navigation";
import { Importer } from './Importer';
import { ListRoutes } from './ListRoutes';
import { SeeRouteRouter } from './SeeRoute';
import 'bootstrap/dist/css/bootstrap';
import { AllRoutes } from './AllRoutes';

/**
 * Main component and router to access all pages in the app
 * We should declare Navbar and Footer here
 */
export class App extends Component {
    public render(): ReactElement {
        return (
            <Fragment>
                <HashRouter>   
                    <Navigation/>     
                    <Routes>
                        <Route path="/" element={<Index/>}/>
                        <Route path="/index" element={<Index/>}/>
                        <Route path="/importer" element={<Importer/>}/>
                        <Route path="/listRoutes" element={<ListRoutes/>}/>
                        <Route path="/allRoutes" element={<AllRoutes/>}/>
                        <Route path="/seeRoute/:id" element={<SeeRouteRouter/>}/>
                    </Routes>
                </HashRouter>
            </Fragment>
        );
    }
}

//Link the main component (App) with the html (index.html)
ReactDOM.render(<div><App/></div>, document.getElementById("root"));

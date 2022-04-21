import { Component, Fragment, ReactElement } from 'react';
import * as ReactDOM from "react-dom";
import { Route, Routes, HashRouter} from "react-router-dom";
import { Index } from "./Index/Index";
import { Navigation } from "./Navigation";
import { GoogleMaps } from "./GoogleMaps/GoogleMaps";
import { IGN } from "./IGN/IGN";
import { Importer } from './Importer/Importer';
import { ListRoutes } from './ListRoutes/ListRoutes';

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
                        <Route path="index" element={<Index/>}/>
                        <Route path="googleMaps" element={<GoogleMaps/>}/>
                        <Route path="ign" element={<IGN/>}/>
                        <Route path="importer" element={<Importer/>}/>
                        <Route path="listRoutes" element={<ListRoutes/>}/>
                    </Routes>
                </HashRouter>
            </Fragment>
        );
    }
}

//Link the main component (App) with the html (index.html)
ReactDOM.render(<div><App/></div>, document.getElementById("root"));

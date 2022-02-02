import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Router, Route ,Link, Routes, HashRouter} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from "react-bootstrap";
import { Index } from "./Index";
import { Navigation } from "../components/Navigation";
import { GoogleMaps } from "./GoogleMaps";
import { Leaflet } from "./Leaflet";

type AppProps = {};

type AppState = {};

export class App extends React.Component<AppProps, AppState> {
  

  render() {
    return (
      <React.Fragment>
        <HashRouter>   
          <Navigation/>     
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="index" element={<Index />} />
            <Route path="googleMaps" element={<GoogleMaps />} />
            <Route path="leaflet" element={<Leaflet />} />
          </Routes>
        </HashRouter>
      </React.Fragment>

      /*
      <React.Fragment>
        <HashRouter>
          <Navigation/>
            <Routes>
              <Route path="/" element={<Index/>}/>
              <Route path="/googleMaps" element={<Map/>}/>
            </Routes>
          <Index/>
        </HashRouter>
      </React.Fragment>
      */
    );
  }
}

//Link the main component (App) with the html (index.html)
ReactDOM.render(<div><App/></div>, document.getElementById("root"));

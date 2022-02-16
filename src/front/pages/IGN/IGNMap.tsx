import React, { Component, Fragment } from "react";
import Map from "ol/Map";
import View from "ol/View";
import KML from 'ol/format/KML';
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import './../../AppStyle.css';
import "ol/ol.css";

interface MapProps {}

interface MapState {
  //Class to create object from api
  map: Map;
}

/**
 * Component to display IGN Map
 */
export class IGNMap extends Component<MapProps, MapState> {
  constructor(props: MapProps) {
    super(props);
    this.state = {
      map: null,
    };
  }

  componentDidMount() {
    //This object will save the different layers that we want to show
    const ownLayers = [ 
      //Grey background    
      new TileLayer({
        source: new TileWMS({  
          url: "https://www.ign.es/wms-inspire/ign-base",
          params: { "LAYERS": "IGNBaseTodo-gris" }
        })
      }),

      //Raster map
      new TileLayer({
        source: new TileWMS({  
          url: "https://www.ign.es/wms-inspire/mapa-raster",
          params: { "LAYERS": "mtn_rasterizado" }
        })
      }),

      new VectorLayer({
        source: new VectorSource({
          url: 'https://openlayers.org/en/latest/examples/data/kml/2012-02-10.kml',
          format: new KML(),
        }),
      }),

      new VectorLayer({
        source: new VectorSource({
          url: 'https://googlearchive.github.io/js-v2-samples/ggeoxml/cta.kml',
          format: new KML(),
        }),
      })

      /*
      // Seismic data
      new TileLayer({
        source: new TileWMS({
          url: "https://www.ign.es/wms-inspire/geofisica",
          params: { "LAYERS": "Ultimos30dias" }
        })
      })
      */
    ];
    
    this.setState({
      map: new Map({
        target: 'ignMap',
        layers: ownLayers,
        view: new View({
          center: [0, 0],
          zoom: 4
        })
      })
    });
  }

  render() {
    return (
      <Fragment>
        <div id="ignMap" className="map-size"></div>
      </Fragment>
    );
  }
}

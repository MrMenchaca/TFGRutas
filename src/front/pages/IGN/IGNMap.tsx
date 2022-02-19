import React, { Component, Fragment, ReactElement } from "react";
import Map from "ol/Map";
import View from "ol/View";
import KML from 'ol/format/KML';
import GPX from 'ol/format/GPX';
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import Layer from "ol/layer/Layer";
import Feature from 'ol/Feature'
import Point from "ol/geom/Point"
import Stroke from "ol/style/Stroke";
import LineString from "ol/geom/LineString";
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
  public constructor(props: MapProps) {
    super(props);
    this.state = {
      map: null,
    };
  }

  private getRoute(): VectorLayer<any>{
    //Se puede pasar un tercer parámetro para la altitud
    const coords: number[][] = [
      [-5.923093, 43.524401],
      [-5.923914, 43.522903],
      [-5.923978, 43.522164],
      [-5.924901, 43.521989],
      [-5.925690, 43.521087],
    ];
    const lineString = new LineString(coords);
    lineString.transform('EPSG:4326', 'EPSG:3857');
    const feature = new Feature({
      geometry: lineString
    });

    return new VectorLayer({
      source: new VectorSource({
        features: [
          feature
        ]
      }),
      style: new Style({
        stroke: new Stroke({
          color: 'red',
          width: 5
        })
      })
    })
  }

  private getLayers(): Layer<any, any>[]{
    return [ 
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

      this.getRoute(),

      /*
      new VectorLayer({
        source: new VectorSource({
          url: 'https://openlayers.org/en/latest/examples/data/kml/2012-02-10.kml',
          format: new KML(),
        }),
      }),
      */
    ];
  }

  public componentDidMount(): void {  
    this.setState({
      map: new Map({
        target: 'ignMap',
        layers: this.getLayers(),
        view: new View({
          //ol.proj.fromLonLat([54.081, 32.908])
          center: [0, 0],
          zoom: 4
        })
      })
    });
  }

  public render(): ReactElement {
    return (
      <Fragment>
        <div id="ignMap" className="map-size"></div>
      </Fragment>
    );
  }
}

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
import { Database } from "../../../back/database/Database";
import { Route } from "../../../back/domain/Route";


interface MapProps {
    routes: Route[];
}

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

    private getRoutes(): VectorLayer<any>[] {
        const routes = this.props.routes;    
        const coords: VectorLayer<any>[] = [];
        routes.forEach(function (route: Route){
            //Se puede pasar un tercer parámetro para la altitud
            const lineString = new LineString(route.getIGNCoordinates());
            lineString.transform('EPSG:4326', 'EPSG:3857');
            const feature = new Feature({
                geometry: lineString
            });

            coords.push(new VectorLayer({
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
            }));
        });  
        return coords; 
    }

    private getBasicLayers(): Layer<any, any>[]{
        const layers: Layer<any, any>[] = [ 
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

            /*
            new VectorLayer({
                source: new VectorSource({
                url: 'https://openlayers.org/en/latest/examples/data/kml/2012-02-10.kml',
                format: new KML(),
                }),
            }),
            */
        ];
        return layers;
    }

    public componentDidMount(): void {  
        this.setState({
            map: new Map({
                target: 'ignMap',
                layers: this.getBasicLayers(),
                view: new View({
                    //ol.proj.fromLonLat([54.081, 32.908])
                    center: [0, 0],
                    zoom: 4
                })
            })
        }, () => {
            this.getRoutes().forEach((route) => {
                this.state.map.addLayer(route);
            }, this);
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

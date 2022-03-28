import { Component, Fragment, ReactElement } from 'react';
import { ParserManager } from '../../../back/parsers/ParserManager';
import { Coordinate } from '../../../back/domain/Coordinate';
import './../../AppStyle.css';

interface MapProps {
    center: google.maps.LatLngLiteral;
    zoom: number;
}

interface MapState {
    //Class to create object from api
    map: google.maps.Map;
}

/**
 * Component to display Google Maps Map
 */
export class GoogleMapsMap extends Component<MapProps, MapState>{    
    public constructor(props: MapProps){
        super(props);
        this.state = {
            map: null,
        }
    }

    private getRoute(): google.maps.Data.LineString {
        const parserManager = new ParserManager();
        const parser = parserManager.getParser("D:/Downloads/hormiguita-circular-ria-de-aviles-sendas-del-rio-arlos-verde.tcx");
        if (parser != null){
            const route = parser.fromFileToDomain("D:/Downloads/hormiguita-circular-ria-de-aviles-sendas-del-rio-arlos-verde.tcx");
            const coords = route.getGoogleMapsCoordinates();
            return new google.maps.Data.LineString(coords);
        }
        else {
            return null;
        }
    }

    public componentDidMount(): void {
        //Create the map
        const map = new window.google.maps.Map(document.getElementById("map") as HTMLElement, {
            center: this.props.center,
            zoom: this.props.zoom,
            mapTypeControlOptions: {
                mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain"],
            },
        });
        
        map.data.add({
            geometry: this.getRoute(),
        });

        /**
         * setState is async, so in the second param, we place the funcionality that needs the state
         * updated to work. In this case we need the map to be loaded for the kml to be displayed
         */
        this.setState({ 
            map: map
        }, () => {
            const marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(43.524401, -5.923093),
                title: "Marker A",
            })

        /*
        const kml = new google.maps.KmlLayer({
            url: "https://googlearchive.github.io/js-v2-samples/ggeoxml/cta.kml",
            map: this.state.map
        })
        */
        });
    }

    public render(): ReactElement {
        return (
            <Fragment>
                <div id="map" className="map-size"></div>
            </Fragment>
        );
    }
}


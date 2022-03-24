import { Component, Fragment, ReactElement } from 'react';
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
        const coords: {lat: number, lng: number}[] = [
            { lat: 43.524401, lng: -5.923093 }, 
            { lat: 43.522903, lng: -5.923914 }, 
            { lat: 43.522164, lng: -5.923978 }, 
            { lat: 43.521989, lng: -5.924901 }, 
            { lat: 43.521087, lng: -5.925690 }, 
        ];

        return new google.maps.Data.LineString(coords);
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


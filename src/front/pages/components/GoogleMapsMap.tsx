import { Component, Fragment, ReactElement } from 'react';
import './../../AppStyle.css';
import { Route } from '../../../back/domain/Route';
import { Coordinate } from '../../../back/domain/Coordinate';

interface MapProps {
    center: Coordinate;
    zoom: number;
    routes: Route[];
    style: string;
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

    /**
     * Parse routes so that GoogleMaps can read it
     * 
     * @return google.maps.Data.LineString[]
     */
    private getParsedRoutes(): google.maps.Data.LineString[] {  
        const coords: google.maps.Data.LineString[] = [];
        this.props.routes.forEach(function (route: Route){
            coords.push(new google.maps.Data.LineString(route.getGoogleMapsCoordinates()));
        });  
        return coords; 
    }

    public componentDidMount(): void {
        //Create the map
        const map = new window.google.maps.Map(document.getElementById("map") as HTMLElement, {
            center: this.props.center.getGoogleMapsStructure(),
            zoom: this.props.zoom,
            mapTypeControlOptions: {
                mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain"],
            },
        });
        
        this.getParsedRoutes().forEach((route) => {
            map.data.add({
                geometry: route,
            });
        });
       

        /**
         * setState is async, so in the second param, we place the funcionality that needs the state
         * updated to work. In this case we need the map to be loaded for the kml to be displayed
         */
        this.setState({ 
            map: map
        }, () => {
            /*
            const marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(43.524401, -5.923093),
                title: "Marker A",
            })
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
                <div id="map" className={this.props.style}></div>
            </Fragment>
        );
    }
}


import { Component, Fragment } from 'react';
import './../../AppStyle.css';

interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
}

interface MapState {
  //Class to create object from api
  map: google.maps.Map;

  //Defines how the map looks
  style: google.maps.StyledMapType;
}

/**
 * Component to display Google Maps Map
 */
export class GoogleMapsMap extends Component<MapProps, MapState>{    
  constructor(props: MapProps){
    super(props);
    this.state = {
      map: null,
      style: null
    }
  }

  componentDidMount(): void {
    /**
     * setState is async, so in the second param, we place the funcionality that needs the state
     * updated to work. In this case we need the map to be loaded for the kml to be displayed
     */
    this.setState({ 
      map: new window.google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: this.props.center,
        zoom: this.props.zoom,
        mapTypeControlOptions: {
          mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain"],
        },
      })
    }, () => {
      const kml = new google.maps.KmlLayer({
        url: "https://googlearchive.github.io/js-v2-samples/ggeoxml/cta.kml",
        map: this.state.map
      })

      const kml2 = new google.maps.KmlLayer({
        url: "https://openlayers.org/en/latest/examples/data/kml/2012-02-10.kml",
        map: this.state.map
      })
    });
  }

  render() {
    return (
      <Fragment>
        <div id="map" className="map-size"></div>
      </Fragment>
    );
  }
}


import { Component, Fragment } from 'react';

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
    this.setState({ map: new window.google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: this.props.center,
      zoom: this.props.zoom,
      mapTypeControlOptions: {
        mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain"],
      },
    })});
  }

  render() {
    const divStyle={
      height:'800px', 
      width: '1000px'
    }

    return (
      <Fragment>
        <div id="map" style={divStyle}></div>
      </Fragment>
    );
  }
}


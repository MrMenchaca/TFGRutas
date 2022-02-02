import React, { useEffect, useRef, useState } from "react";

interface MapProps {
    center: google.maps.LatLngLiteral;
    zoom: number;
}

interface MapState {
    map: google.maps.Map;
    style: google.maps.StyledMapType;
}


export class Map extends React.Component<MapProps, MapState>{    
  constructor(props: MapProps){
    super(props);
    this.state = {
      map: null,
      style: new google.maps.StyledMapType([
        {
          "featureType": "all",
          "stylers": [
            { "color": "#C0C0C0" }
          ]
        },{
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            { "color": "#CCFFFF" }
          ]
        },{
          "featureType": "landscape",
          "elementType": "labels",
          "stylers": [
            { "visibility": "off" }
          ]
        }
      ],
      { name: "Styled Map" }),
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
      <div id="map" style={divStyle}></div>
    );
  }
}


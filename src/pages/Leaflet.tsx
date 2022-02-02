import * as React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export class Leaflet extends React.Component {
    render() {
        const defaultPosition = {
            lat: 51.505,
            lng: -0.09,
            zoom: 13
          };
        const position: [number, number] = [defaultPosition.lat, defaultPosition.lng];

        return (
            <React.Fragment>
               <MapContainer center={position} zoom={defaultPosition.zoom} scrollWheelZoom={false}>
                    <TileLayer 
                    
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </React.Fragment>
        )
    }
}

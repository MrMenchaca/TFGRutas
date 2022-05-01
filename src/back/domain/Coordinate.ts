import { fromLonLat } from "ol/proj";

export class Coordinate {
    //Attributes
    private lat: number;
    private lng: number;
    private alt: number;

    //Constructor
    public constructor(lat: number, lng: number, alt: number){
        this.lat = lat;
        this.lng = lng;
        this.alt = alt;
    }

    //Functions
    public getGoogleMapsStructure(): {lat: number, lng: number}{
        return {lat: this.getLat(), lng: this.getLng()};
    }

    public getIGNStructure(): number[]{
        return [this.getLng(), this.getLat()];
    }

    public getIGNCenter(): number[]{
        return fromLonLat([this.getLng(), this.getLat()]);
    }
    
    //Getters
    public getLat(): number { return this.lat; }
    public getLng(): number { return this.lng; }
    public getAlt(): number { return this.alt; }
}
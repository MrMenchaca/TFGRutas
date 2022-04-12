import { Coordinate } from "./Coordinate";

export class Route {
    //Attributes
    private _id: string;
    private name: string;
    private coordinates: Coordinate[];


    //Constructor
    constructor(name: string, coordinates: Coordinate[]) {
        this.name = name;
        this.coordinates = coordinates;
    }


    //Functions
    public getGoogleMapsCoordinates(): {lat: number, lng: number}[]{
        const coords: {lat: number, lng: number}[] = [];
        this.getCoordinates().forEach(function(elem: Coordinate){
            coords.push({lat: elem.getLat(), lng: elem.getLng()});
        });
        return coords;
    }

    public getIGNCoordinates(): number[][]{
        const coords: number[][] = [];
        this.getCoordinates().forEach(function(elem: Coordinate){
            coords.push([elem.getLng(), elem.getLat()]);
        });
        return coords;
    }


    //Getters
    public getName(): string { return this.name; }
    public getCoordinates(): Coordinate[] { return this.coordinates; }
}
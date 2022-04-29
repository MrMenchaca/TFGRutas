import { Coordinate } from "./Coordinate";

export class Route {
    //Attributes
    private _id: string;
    private name: string;
    private coordinates: Coordinate[];


    //Constructor
    constructor(name: string, coordinates: Coordinate[],
         _id: string = null) {
        this.name = name;
        this.coordinates = coordinates;
        this._id = _id;
    }


    //Functions
    public getGoogleMapsCoordinates(): {lat: number, lng: number}[]{
        const coords: {lat: number, lng: number}[] = [];
        this.getCoordinates().forEach(function(elem: Coordinate){
            coords.push(elem.getGoogleMapsStructure());
        });
        return coords;
    }

    public getIGNCoordinates(): number[][]{
        const coords: number[][] = [];
        this.getCoordinates().forEach(function(elem: Coordinate){
            coords.push(elem.getIGNStructure());
        });
        return coords;
    }

    public getCenter(): Coordinate{
        return this.coordinates.at(0);
    }

    //Getters
    public getName(): string { return this.name; }
    public getCoordinates(): Coordinate[] { return this.coordinates; }
    public getId(): string { return this._id }
}
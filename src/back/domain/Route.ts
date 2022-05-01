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
        let altitude = 0;
        let longitude = 0;
        for(let i=0; i < this.coordinates.length; i ++){
            altitude += this.coordinates[i].getLat();
            longitude += this.coordinates[i].getLng();
        }
        altitude = altitude/this.coordinates.length;
        longitude = longitude/this.coordinates.length;

        return new Coordinate(altitude, longitude, 0);
    }

    public getElevationProfile(): [number, number][]{
        const coords: [number, number][] = [];
        let x = 0;
        this.getCoordinates().forEach((coor: Coordinate) => { 
            coords.push([x, coor.getAlt()]);
            x++;
        });
        return coords;
    }

    //Getters
    public getName(): string { return this.name; }
    public getCoordinates(): Coordinate[] { return this.coordinates; }
    public getId(): string { return this._id }
}
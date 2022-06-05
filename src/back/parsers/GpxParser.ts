import { Coordinate } from '../domain/Coordinate';
import { Route } from '../domain/Route';
import { AbstractParser } from './AbstractParser';

export class GpxParser extends AbstractParser {
    protected parseFile(file: any): Route{
        //Basic data
        const date: Date = new Date(file["gpx"]["metadata"]["time"]);
        const dateString: string = date.toLocaleDateString(); 
        const name: string =  "[" + dateString + "] - " + file["gpx"]["trk"]["name"];
        
        //Coordinates
        const fileCoordinates: any[] = file["gpx"]["trk"]["trkseg"]["trkpt"];
        const customCoordinates: Coordinate[] = [];
        fileCoordinates.forEach(function(coor: any){
            customCoordinates.push(new Coordinate(Number(coor["@_lat"]), Number(coor["@_lon"]), coor["ele"], new Date(coor["time"])));
        });
        console.log(customCoordinates);
        return new Route(name, customCoordinates);
    }
}
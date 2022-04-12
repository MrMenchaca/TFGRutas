import { Coordinate } from '../domain/Coordinate';
import { Route } from '../domain/Route';
import { AbstractParser } from './AbstractParser';

export class GpxParser extends AbstractParser {
    public parseFile(file: any): Route{
        //Basic data
        const name: string = file["gpx"]["metadata"]["name"];
        
        //Coordinates
        const fileCoordinates: any[] = file["gpx"]["trk"]["trkseg"]["trkpt"];
        const customCoordinates: Coordinate[] = [];
        fileCoordinates.forEach(function(coor: any){
            customCoordinates.push(new Coordinate(Number(coor["@_lat"]), Number(coor["@_lon"])));
        });
        
        return new Route(name, customCoordinates);
    }
}
import { Coordinate } from '../domain/Coordinate';
import { Route } from '../domain/Route';
import { AbstractParser } from './AbstractParser';

export class TcxParser extends AbstractParser {
    public parseFile(file: any): Route{
        //Basic data
        const name: string = file["TrainingCenterDatabase"]["Courses"]["Course"]["Name"];
        
        //Coordinates
        const fileCoordinates: any[] = file["TrainingCenterDatabase"]["Courses"]["Course"]["Track"]["Trackpoint"];
        const customCoordinates: Coordinate[] = [];
        fileCoordinates.forEach(function(coor: any){
            customCoordinates.push(new Coordinate(Number(coor["Position"]["LatitudeDegrees"]), Number(coor["Position"]["LongitudeDegrees"]), Number(coor["AltitudeMeters"])));
        });
        
        return new Route(name, customCoordinates);
    }
}


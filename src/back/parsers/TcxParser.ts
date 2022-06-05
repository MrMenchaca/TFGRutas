import { Coordinate } from '../domain/Coordinate';
import { Route } from '../domain/Route';
import { AbstractParser } from './AbstractParser';

export class TcxParser extends AbstractParser {
    protected parseFile(file: any): Route {
        const fileCoordinates: any[] = file["TrainingCenterDatabase"]["Courses"]["Course"]["Track"]["Trackpoint"];
        
        //Basic data
        const date: Date = new Date(fileCoordinates[0]["Time"]);
        const dateString: string = date.toLocaleDateString(); 
        const name: string =  "[" + dateString + "] - " + file["TrainingCenterDatabase"]["Courses"]["Course"]["Name"];
        const distance: number = file["TrainingCenterDatabase"]["Courses"]["Course"]["Lap"]["DistanceMeters"];
        
        //Coordinates
        const customCoordinates: Coordinate[] = [];
        fileCoordinates.forEach(function(coor: any){
            customCoordinates.push(new Coordinate(Number(coor["Position"]["LatitudeDegrees"]), Number(coor["Position"]["LongitudeDegrees"]), Number(coor["AltitudeMeters"]), new Date(coor["Time"])));
        });
        
        return new Route(name, customCoordinates, null, distance);
    }
}


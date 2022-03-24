import { Route } from './domain/Route';
import * as fs from 'fs';
import { XMLParser } from "fast-xml-parser";

export class Parser { 
    
    public readFile(filePath: string): Route{
        let route: Route = null;
        
        try{
            //Read file
            const file = fs.readFileSync(filePath, 'utf8');

            //Parse file
            const parser = new XMLParser();
            const fileParsed = parser.parse(file);
            const name = fileParsed["gpx"]["metadata"]["name"];

            //Create our custom Route
            route = new Route(name);
        }
        catch(err){
            console.log(err);
        }

        return route;
    }
}

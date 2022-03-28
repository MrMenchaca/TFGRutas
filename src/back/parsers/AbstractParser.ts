import { Route } from '../domain/Route';
import * as fs from 'fs';
import { XMLParser } from "fast-xml-parser";

export abstract class AbstractParser { 
    
    //#region fromFileToDomain methods

    public fromFileToDomain(filePath: string): Route{
        const file = this.readFile(filePath);
        return this.parseFile(file);
    }

    private readFile(filePath: string): any{
        try{
            const file = fs.readFileSync(filePath, 'utf8');
            const options = {
                ignoreAttributes : false
            };
            const parser = new XMLParser(options);
            return parser.parse(file);
        }
        catch(err){
            console.log(err);
            return null;
        }
    }

    abstract parseFile(file: any): Route;
    
    //#endregion
}

import { Route } from '../domain/Route';
import * as fs from 'fs';
import { XMLParser } from "fast-xml-parser";

export abstract class AbstractParser { 
    
    public fromFileToDomain(filePath: string): Route{
        const file = this.readFile(filePath);
        return this.parseFile(file);
    }

    /**
     * Read file and return it
     * 
     * @param filepath Absolute path of the file
     * @return any File
     */
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

    /**
     * Read specific data from file and parse it into domain route
     * 
     * @param file Route file
     * @return Route
     */
    abstract parseFile(file: any): Route;
}

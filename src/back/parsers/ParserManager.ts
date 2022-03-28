import { GpxParser } from "./GpxParser";
import { IParser } from "./IParser";
import { TcxParser } from "./TcxParser";

export class ParserManager {
    public getParser(filePath: string): IParser{
        //Get extension
        const array = filePath.split(".");
        const extension = array[array.length - 1];

        //Return Parser
        if (extension.toLowerCase().localeCompare("gpx") == 0){
            return new GpxParser();
        }
        else if (extension.toLocaleLowerCase().localeCompare("tcx") == 0){
            return new TcxParser();
        }
        else {
            return null;
        }
    }
}
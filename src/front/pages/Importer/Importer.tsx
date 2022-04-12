import { Component, Fragment, ReactElement } from "react";
import * as path from 'path';
import { ParserManager } from "../../../back/parsers/ParserManager";
import { Database } from "../../../back/database/Database";

export class Importer extends Component{ 
    private handleChange(event: any): void{
        //Obtenemos el parser correspondiente a la extensión del fichero
        const filePath = event.target.files[0].path;
        const parserManager = new ParserManager();
        const parser = parserManager.getParser(filePath);

        if (parser != null){
            //Leemos el fichero
            const route = parser.fromFileToDomain(filePath);

            //Guardamos el fichero en BD
            Database.saveRoute(route);
        }
    }
    
    public render(): ReactElement {
        return (
            <Fragment>
                <h1>Guardar archivo</h1>
                <input type='file' id='file' onChange={this.handleChange}/>
            </Fragment>
        );
    }
}
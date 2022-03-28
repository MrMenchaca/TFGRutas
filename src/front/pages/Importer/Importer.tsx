import { Component, Fragment, ReactElement } from "react";
import * as path from 'path';
import { ParserManager } from "../../../back/parsers/ParserManager";

export class Importer extends Component{ 
    private handleChange(event: any): void{
        const filePath = event.target.files[0].path;
        const parserManager = new ParserManager();
        const parser = parserManager.getParser(filePath);
        if (parser != null){
            const route = parser.fromFileToDomain(filePath);
            console.log(route);
        }
    }
    
    public render(): ReactElement {
        return (
            <Fragment>
                <h1>PRUEBA</h1>
                <input type='file' id='file' onChange={this.handleChange}/>
            </Fragment>
        );
    }
}
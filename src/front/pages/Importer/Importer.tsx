import { Component, Fragment, ReactElement } from "react";
import * as path from 'path';
import { Parser } from "../../../back/Parser";

export class Importer extends Component{ 
    private handleChange(event: any): void{
        const filePath = event.target.files[0].path;
        const importer = new Parser();
        const route = importer.readFile(filePath);
        console.log(route.getName());
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
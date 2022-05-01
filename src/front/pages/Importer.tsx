import { Component, Fragment, ReactElement } from "react";
import { ParserManager } from "../../back/parsers/ParserManager";
import { Database } from "../../back/database/Database";
import { Col, Container, Row } from "react-bootstrap";
import Dropzone from "react-dropzone";
import "../AppStyle.css";

/**
 * Importer page
 */
export class Importer extends Component{ 
    private importInputFiles(event: any): any{
        const files = event.target.files;

        for(let i=0; i < files.length; i++){
            //Obtenemos el parser correspondiente a la extensión del fichero
            const parserManager = new ParserManager();
            const parser = parserManager.getParser(files[i].name);

            if (parser != null){
                //Leemos el fichero
                const route = parser.fromFileToDomain(files[i].path);

                //Guardamos el fichero en BD
                Database.saveRoute(route);
            }
        }
    }
    
    private importDropzoneFiles(files: any): any{
        console.log(files);

        files.forEach((file: File) => {
            //Obtenemos el parser correspondiente a la extensión del fichero
            const parserManager = new ParserManager();
            const parser = parserManager.getParser(file.name);

            if (parser != null){
                //Leemos el fichero
                const route = parser.fromFileToDomain(file.path);

                //Guardamos el fichero en BD
                Database.saveRoute(route);
            }
        });
    }
    
    public render(): ReactElement {
        return (
            <Fragment>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <h1 className="pageTitle">Importar archivos</h1>
                        </Col>
                    </Row>  
                    <Row className="justify-content-md-center">
                        <Dropzone noClick={true} onDrop={(acceptedFiles) => this.importDropzoneFiles(acceptedFiles)}>
                            {({getRootProps, getInputProps}) => (
                                <section className="dropzone" style={{cursor: "inherit"}}>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Arrastrar ficheros</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </Row>  
                    <Row className="justify-content-md-center">
                        <label id="inputLabel" htmlFor="fileSelector" className="btn btn-primary">Seleccionar desde explorador de archivos</label>
                        <input 
                            type="file" 
                            id="fileSelector" 
                            multiple={true} 
                            accept=".gpx, .tcx"
                            style={{display: "none"}}
                            onChange={this.importInputFiles}/>
                    </Row>  
                </Container>
            </Fragment>
        );
    }
}
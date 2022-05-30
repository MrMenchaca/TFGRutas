import { Component, Fragment, ReactElement } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { Route } from "../../back/domain/Route";
import { Database } from "../../back/database/Database";
import { ParserManager } from "../../back/parsers/ParserManager";
import "../AppStyle.css";
import { AllRoutesManagement } from "./components/AllRoutesManagement";
import { ListRoutesManagement } from "./components/ListRoutesManagement";
import { ListManagement } from "./components/ListManagement";
import { ImportErrorModal } from "./components/ImportErrorModal";

interface ImporterProps {}

interface ImporterState {
    list: any;
    isErrorModalDisplayed: boolean
}

/**
 * Importer page
 */
export class Importer extends Component<ImporterProps, ImporterState>{ 
    private idList: string;

    public constructor(props: ImporterProps){
        super(props);
        this.state = {
            list: <AllRoutesManagement/>,
            isErrorModalDisplayed: false
        }
    }
    
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
                Database.saveRoute(route)
                
                //Refrescamos la lista
                this.changeList(null);
            }
        }
    }
    
    private importDropzoneFiles(files: any): any{
        files.forEach((file: File) => {
            //Obtenemos el parser correspondiente a la extensión del fichero
            const parserManager = new ParserManager();
            const parser = parserManager.getParser(file.name);

            if (parser != null){
                //Leemos el fichero
                const route = parser.fromFileToDomain(file.path);

                //Guardamos el fichero en BD
                Database.saveRoute(route)

                //Refrescamos la lista
                this.changeList(null);
            }
            else{
                this.showErrorModal();
            }
        });
    }

    public showErrorModal(): void {
        this.setState({
            isErrorModalDisplayed: true
        });
    } 
    
    public hideErrorModal(): void {
        this.setState({
            isErrorModalDisplayed: false
        });
    }

    public changeList(idList: string): void{
        this.idList = idList;
        if (this.idList == null)
            this.setState({
                list: null
            },() => {
                this.setState({
                    list: <AllRoutesManagement/>
                });
            });
        else
            this.setState({
                list: null
            },() => {
                this.setState({
                    list: <ListRoutesManagement 
                        idList={this.idList}
                        changeList={this.changeList.bind(this)}/>
                }); 
            });
    }
    
    public render(): ReactElement {
        return (
            <Fragment>
                {/* Importer */}
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <h1 className="pageTitle">Importar</h1>
                        </Col>
                    </Row>  
                    <Row className="justify-content-md-center">
                        <Dropzone noClick={true} onDrop={(acceptedFiles) => this.importDropzoneFiles(acceptedFiles)}>
                            {({getRootProps, getInputProps}) => (
                                <section className="dropzone" style={{marginTop: "5px"}}>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Arrastrar rutas con formato .gpx o .tcx</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </Row>  
                    <Row className="justify-content-md-center">
                        <label htmlFor="fileSelector" className="btn btn-primary bckColor">Seleccionar desde explorador de archivos</label>
                        <input 
                            type="file" 
                            id="fileSelector" 
                            multiple={true} 
                            accept=".gpx, .tcx"
                            style={{display: "none"}}
                            onChange={this.importInputFiles.bind(this)}/>
                    </Row>  
                </Container>

                {/* Managment */}
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <h1 style={{marginTop: "40px"}}>Gestionar</h1>
                        </Col>
                    </Row> 
                    <Row className="justify-content-md-center">
                        <Col>
                            <ListManagement 
                                changeList={this.changeList.bind(this)} 
                                idActiveList={this.idList}/>
                        </Col>
                        <Col xs={9}>
                            {this.state.list}
                        </Col>
                    </Row>   
                </Container>
                <ImportErrorModal 
                    isShow={this.state.isErrorModalDisplayed} 
                    onHide={() => this.hideErrorModal()}/>
            </Fragment>
        );
    }
}
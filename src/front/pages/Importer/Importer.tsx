import { ipcRenderer } from "electron";
import { Component, Fragment, ReactElement } from "react";

export class Importer extends Component{
	/** Define channel name */
  private CHANNEL_NAME = 'main'; 
  
  private import(): void{
    console.log("click");  
    
    /** Message to be sent */
    let message = 'ping';

    /** Show response for a sync IPC request */
  }
  
  public componentDidMount(): void {  
   
  }

  public render(): ReactElement {
	  return (
		  <Fragment>
			  <h1>PRUEBA</h1>
        		<button onClick={this.import}>Press me</button>
		  </Fragment>
		);
	}
}
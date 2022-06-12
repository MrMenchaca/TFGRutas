import { Route } from "./Route";

export class ListRoute {
    //Attributes
    private _id: string;
    private name: string;
    private routes: Route[];


    //Constructor
    constructor(name: string, routes: Route[],
         _id: string = null) {
        this.name = name;
        this.routes = routes;
        this._id = _id;
    }


    //Functions

    
    //Getters
    public getName(): string { return this.name; }
    public getRoutes(): Route[] { return this.routes; }
    public getId(): string { return this._id }
}
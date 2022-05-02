import Nedb from "nedb";
import { Coordinate } from "../domain/Coordinate";
import { ListRoute } from "../domain/ListRoute";
import { Route } from "../domain/Route";

export class Database {
    static readonly DB_FILE_PATH = ".\\database.db";
    
    static readonly TYPE_ROUTE = 0;
    static readonly TYPE_LIST_ROUTE = 1;


    private static db: Nedb;

    /**
     * Singleton pattern. 
     * 
     * @return Nedb 
     */
    public static getInstance(){
        if(!this.db) 
            this.db = new Nedb({filename: this.DB_FILE_PATH, autoload: true});
        return this.db;
    }

    /**
     * Save route in DB
     * 
     * @param route Route to save
     * @return boolean True if everything is ok, false otherwise
     */
    public static saveRoute(route: Route): boolean{
        const db = this.getInstance();

        db.insert({
            type: this.TYPE_ROUTE,
            name: route.getName(), 
            coordinates: route.getCoordinates() 
        }, function(err, record) {
            if (err) {
                console.error(err);
                return false;
            }
            console.log(record);
            return true;
        });

        return false;
    }

    /**
     * Save listRoute in DB
     * 
     * @param listRoute ListRoute to save
     * @return boolean True if everything is ok, false otherwise
     */
     public static saveListRoute(listRoute: ListRoute): boolean{
        const db = this.getInstance();

        db.insert({
            type: this.TYPE_LIST_ROUTE,
            name: listRoute.getName(), 
            routes: listRoute.getRoutes() 
        }, function(err, record) {
            if (err) {
                console.error(err);
                return false;
            }
            console.log(record);
            return true;
        });

        return false;
    }

    /**
     * Delete listRoute in DB that match id passed as param
     * 
     * @param id ListRoute id
     * @return boolean True if everything is ok, false otherwise
     */
    public static deleteListRoute(id: string): boolean {
        const db = this.getInstance();
        
        db.remove({type: this.TYPE_LIST_ROUTE, _id: id}, (err, num) => {
            if (err) {
                console.error(err);
                return false;
            }
            return true;
        });
        
        return false;
    }

    /**
     * Delete listRoute in DB that match id passed as param
     * 
     * @param id ListRoute id
     * @return boolean True if everything is ok, false otherwise
     */
     public static deleteRoute(id: string): boolean {
        const db = this.getInstance();
        
        db.remove({type: this.TYPE_ROUTE, _id: id}, (err, num) => {
            if (err) {
                console.error(err);
                return false;
            }
            return true;
        });
        
        return false;
    }

    /**
     * Get all routes saved in DB.
     * 
     * This method is async, so in order to use it, it will be necessary to resolve returned
     * Promise (await or then()).
     * 
     * @return Promise<Route[]>
     */
    public static async getAllRoutes(): Promise<Route[]>{
        const db = this.getInstance();
        
        return await new Promise((resolve, reject) => {
            db.find({type: this.TYPE_ROUTE}, (err: Error, result: any[]) => {
                if (err) reject(err);
                const routes: Route[] = [];
                // console.log(result);
                result.forEach(function(document: any){
                    routes.push(Database.fromDbToRoute(document));
                });
                resolve(routes);
            });
        });
    }

    /**
     * Get a route by name. If there are two routes with same name, return first.
     * 
     * This method is async, so in order to use it, it will be necessary to resolve returned
     * Promise (await or then()).
     * 
     * @param name Route's name
     * @return Promise<Route>
     */
    public static async getRouteByName(name: string): Promise<Route>{
        const db = this.getInstance();
        
        return await new Promise((resolve, reject) => {
            db.findOne({type: this.TYPE_ROUTE, name: name}, (err: Error, result: any) => {
                if (err) reject(err);
                resolve(Database.fromDbToRoute(result));
            });
        });
    }

    /**
     * Get a route by _id. If there are two routes with same name, return first.
     * 
     * This method is async, so in order to use it, it will be necessary to resolve returned
     * Promise (await or then()).
     * 
     * @param id Route's id
     * @return Promise<Route>
     */
    public static async getRouteById(id: string): Promise<Route>{
        const db = this.getInstance();
        
        return await new Promise((resolve, reject) => {
            db.findOne({type: this.TYPE_ROUTE, _id: id}, (err: Error, result: any) => {
                if (err) reject(err);
                resolve(Database.fromDbToRoute(result));
            });
        });
    }

    /**
     * Get all ListRoutes saved in DB.
     * 
     * This method is async, so in order to use it, it will be necessary to resolve returned
     * Promise (await or then()).
     * 
     * @return Promise<ListRoute[]>
     */
     public static async getAllListRoutes(): Promise<ListRoute[]>{
        const db = this.getInstance();
        
        return await new Promise((resolve, reject) => {
            db.find({type: this.TYPE_LIST_ROUTE}, (err: Error, result: any[]) => {
                if (err) reject(err);
                const listRoutes: ListRoute[] = [];
                // console.log(result);
                result.forEach(function(document: any){
                    listRoutes.push(Database.fromDbToListRoute(document));
                });
                resolve(listRoutes);
            });
        });
    }

    /**
     * Create a new Route from DB data (document)
     * 
     * Whether a route object can be returned directly, I don't know.
     * If an attribute is added to Route, must parse here too
     * 
     * @param document Document from database
     * @return Route created
     */
    public static fromDbToRoute(document: any): Route{
        const id = document["_id"];
        const name = document["name"];
        const coordinates: Coordinate[] = [];
        document["coordinates"]?.forEach((coor: any) => {
            coordinates.push(new Coordinate(Number(coor["lat"]), Number(coor["lng"]), Number(coor["alt"])));
        });

        const route = new Route(name, coordinates, id);
        return route;
    }

    public static addRouteToListsRoute(listRouteIds: string[], routeId: string): boolean{
        const db = this.getInstance();
        
        listRouteIds.forEach((listRouteId) => {
            db.update({
                type: this.TYPE_LIST_ROUTE,
                _id: listRouteId
            }, {
                $push: {
                    routes: routeId
                }
            }, {}, function(err, num) {
                if (err) {
                    console.error(err);
                    return false;
                }
                return true;
            });
        });

        return false;
        
    }

    /**
     * Create a new ListRoute from DB data (document)
     * 
     * Whether a listRoute object can be returned directly, I don't know.
     * If an attribute is added to Route, must parse here too
     * 
     * @param document Document from database
     * @return Route created
     */
     public static fromDbToListRoute(document: any): ListRoute{
        const id = document["_id"];
        const name = document["name"];
        const routes: Route[] = [];
        document["routes"]?.forEach((route: any) => {
            const coordinates: Coordinate[] = [];
            route["coordinates"]?.forEach((coor: any) => {
                coordinates.push(new Coordinate(Number(coor["lat"]), Number(coor["lng"]), Number(coor["alt"])));
            });
            routes.push(new Route(route["name"], coordinates, route["_id"]));
        });

        const listRoute = new ListRoute(name, routes, id);
        return listRoute;
    }
}
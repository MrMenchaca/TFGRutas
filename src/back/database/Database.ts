import Nedb from "nedb";
import { Coordinate } from "../domain/Coordinate";
import { Route } from "../domain/Route";

export class Database {
    static readonly DB_FILE_PATH = ".\\database.db";
    
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
            db.find({}, (err: Error, result: any[]) => {
                if (err) reject(err);
                const routes: Route[] = [];
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
            db.findOne({name: name}, (err: Error, result: any) => {
                if (err) reject(err);
                resolve(Database.fromDbToRoute(result));
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
        //const id = document["_id"];
        const name = document["name"];
        const coordinates: Coordinate[] = [];
        document["coordinates"].forEach(function(coor: any){
            coordinates.push(new Coordinate(Number(coor["lat"]), Number(coor["lng"])));
        });

        const route = new Route(name, coordinates);
        return route;
    }
}
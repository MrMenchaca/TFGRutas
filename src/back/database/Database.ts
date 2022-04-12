import Nedb from "nedb";
import path from "path";
import { Coordinate } from "../domain/Coordinate";
import { Route } from "../domain/Route";

export class Database {
    static readonly DB_FILE_PATH = ".\\database.db";
    
    private static db: Nedb

    public static getInstance(){
        if(!this.db) 
            this.db = new Nedb({filename: this.DB_FILE_PATH, autoload: true});
        return this.db;
    }

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

    public static async getRouteByName(name: string): Promise<Route>{
        const db = this.getInstance();
        return await new Promise((resolve, reject) => {
            db.findOne({name: name}, (err: Error, result: Route) => {
                if (err) reject(err);
                resolve(Database.fromDbToRoute(result));
                // resolve(result);
            });
        });
    }

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
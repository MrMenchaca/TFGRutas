import { Coordinate } from "./Coordinate";

export class Route {
    
    //Attributes
    private _id: string;
    private name: string;
    private coordinates: Coordinate[];
    private distance: number; //Meters
    private totalTime: number; //Seconds
    private ascent: number; //Meters
    private descent: number; //Meters
    private averagePace: number; //Seconds

    //Constructor
    constructor(name: string, coordinates: Coordinate[],
         _id: string = null,
         distance: number = null,
         totalTime: number = null,
         ascent: number = null,
         descent: number = null,
         averagePace: number = null) {

        this.name = name;
        this.coordinates = coordinates;
        this._id = _id;
        if(distance !== null) this.distance = distance; else this.setDistance();
        if(totalTime !== null) this.totalTime = totalTime; else this.setTotalTime();
        if(ascent !== null) this.ascent = ascent; else this.setAscent();
        if(descent !== null) this.descent = descent; else this.setDescent();
        if(averagePace !== null) this.averagePace = averagePace; else this.setAveragePace();
    }


    //Functions
    public getGoogleMapsCoordinates(): {lat: number, lng: number}[]{
        const coords: {lat: number, lng: number}[] = [];
        this.getCoordinates().forEach(function(elem: Coordinate){
            coords.push(elem.getGoogleMapsStructure());
        });
        return coords;
    }

    public getIGNCoordinates(): number[][]{
        const coords: number[][] = [];
        this.getCoordinates().forEach(function(elem: Coordinate){
            coords.push(elem.getIGNStructure());
        });
        return coords;
    }

    public getCenter(): Coordinate{
        let altitude = 0;
        let longitude = 0;
        for(let i=0; i < this.coordinates.length; i ++){
            altitude += this.coordinates[i].getLat();
            longitude += this.coordinates[i].getLng();
        }
        altitude = altitude/this.coordinates.length;
        longitude = longitude/this.coordinates.length;

        return new Coordinate(altitude, longitude);
    }

    public getElevationProfile(): [number, number][]{
        const coords: [number, number][] = [];
        const coordsSeparation = this.distance / this.getCoordinates().length;
        let x = 0;
        this.getCoordinates().forEach((coor: Coordinate) => { 
            coords.push([x, coor.getAlt()]);
            x += coordsSeparation;
        });
        return coords;
    }

    public getDistanceFormatted(): string {
        const distanceKm: number = (this.getDistance() / 1000)
        let distanceString: string = distanceKm.toFixed(2) + "km";
        distanceString = distanceString.replace('.', ',');
        return distanceString;
    }

    public getTotalTimeFormatted(): string {
        const h = Math.floor(this.totalTime / 3600);
        const m = Math.floor(this.totalTime % 3600 / 60);
        const s = Math.floor(this.totalTime % 3600 % 60);

        const hDisplay = h > 0 ? h + "h " : "";
        const mDisplay = m > 0 ? m + "m " : "";
        const sDisplay = s > 0 ? s + "s " : "";
        
        return hDisplay + mDisplay + sDisplay; 
    }

    public getAscentFormatted(): string {
        let distanceString: string = this.ascent.toFixed(2) + "m";
        distanceString = distanceString.replace('.', ',');
        return distanceString;
    }

    public getDescentFormatted(): string {
        let distanceString: string = this.descent.toFixed(2) + "m";
        distanceString = distanceString.replace('.', ',');
        return distanceString;
    }

    public getAveragePaceFormatted(): string {        
        let averagePaceString: string = this.getAveragePace().toFixed(2) + "m/km";
        averagePaceString = averagePaceString.replace('.', ',');
        return averagePaceString; 
    }

    /**
     * This function is translated from this:
     * https://stackoverflow.com/questions/569980/how-to-calculate-distance-from-a-gpx-file#:~:text=The%20traditional%20way%20of%20calculating,is%20with%20the%20Haversine%20formula.&text=This%20returns%20the%20distance%20in,radius%20with%20it%27s%20km%20equivalent.
     */
    private setDistance(): void{
        const DtoR = 0.017453293;
        const R = 6371000; //Meters

        let totalSum = 0;
        for (let i=0; i < this.getCoordinates().length - 1; i++){
            const rLat1 = this.getCoordinates()[i].getLat() * DtoR;
            const rLng1 = this.getCoordinates()[i].getLng() * DtoR;
            const rLat2 = this.getCoordinates()[i+1].getLat() * DtoR;
            const rLng2 = this.getCoordinates()[i+1].getLng() * DtoR;

            const dLat = rLat1 - rLat2;
            const dLng = rLng1 - rLng2;

            const a = Math.pow(Math.sin(dLat/2), 2) + Math.cos(rLat1) * Math.cos(rLat2) * Math.pow(Math.sin(dLng/2), 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
            const d = R * c;
            
            totalSum += d;
        }
        console.log(totalSum);
        this.distance = totalSum;
    }

    private setTotalTime(): void {
        const diffInMs = Math.abs(this.getCoordinates()[this.getCoordinates().length - 1].getTime().getTime()  - this.getCoordinates()[0].getTime().getTime());
        this.totalTime = diffInMs / 1000;
    }

    private setAscent(): void {
        const initialAlt: number = this.getCoordinates()[0].getAlt();
        let higherAlt: number = initialAlt;
        this.getCoordinates().forEach((coor) => {
            if(coor.getAlt() > higherAlt) higherAlt = coor.getAlt();
        });
        this.ascent = higherAlt - initialAlt;
    }

    private setDescent(): void {
        const initialAlt: number = this.getCoordinates()[0].getAlt();
        let lowerAlt: number = initialAlt;
        this.getCoordinates().forEach((coor) => {
            if(coor.getAlt() < lowerAlt) lowerAlt = coor.getAlt();
        });
        this.descent = initialAlt - lowerAlt;
    }

    private setAveragePace(): void {
        const distanceKm = this.getDistance() / 1000;
        const totalTimeMinutes = this.getTotalTime() / 60;
        this.averagePace = totalTimeMinutes / distanceKm;
    }


    //Getters
    public getName(): string { return this.name; }
    public getCoordinates(): Coordinate[] { return this.coordinates; }
    public getId(): string { return this._id }
    public getDistance(): number { return this.distance }
    public getTotalTime(): number { return this.totalTime }
    public getAscent(): number { return this.ascent }
    public getDescent(): number { return this.descent }
    public getAveragePace(): number { return this.averagePace }
}
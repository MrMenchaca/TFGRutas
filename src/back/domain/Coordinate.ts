export class Coordinate {
    //Attributes
    private lat: number;
    private lng: number;

    //Constructor
    public constructor(lat: number, lng: number){
        this.lat = lat;
        this.lng = lng;
    }

    //Functions
    public getLat(): number{
        return this.lat;       
    }

    public getLng(): number{
        return this.lng;       
    }
}
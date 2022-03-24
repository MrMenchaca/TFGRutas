export class Route {
    //Attributes
    private name: string;

    //Constructor
    constructor(name: string) {
        this.name = name;
    }

    //Functions
    public getName(): string{
        return this.name;       
    }
}
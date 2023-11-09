import { ingredients } from "./infrdients.model";

export class Recipe{
    public name:string;
    public description:string;
    public imagePath:string;
    public ingredients:ingredients[];

    constructor(name:string,desc:string,imagePath:string,ingredients:ingredients[]){
        this.name=name;
        this.description=desc;
        this.imagePath=imagePath;
        this.ingredients=ingredients;
    }
}
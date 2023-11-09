import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot, Resolve} from '@angular/router';
import { Recipe } from "../shared/recipe.model";
import { dataStorageService } from "../shared/data-storage.service";
import { recipeService } from "./recipes.service";

@Injectable({providedIn:'root'})
export class recipResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorageService:dataStorageService,private rcpSrv:recipeService){}

    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        const recipes=this.rcpSrv.getRecipes();

        if(recipes.length){
            return this.dataStorageService.fetchData();
        }
        else{
            return recipes;
        }
    }
    
}
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { recipeService } from "../recipes/recipes.service";
import { Recipe } from "./recipe.model";
import { Observable } from "rxjs/internal/Observable";
import {map,tap,take,exhaustMap,catchError} from 'rxjs/operators';
import { authenticateService } from "../auth/auth.service";

@Injectable({providedIn:'root'})
export class dataStorageService{
   constructor(private http:HttpClient,private recipeService:recipeService,private authSrv:authenticateService){}

   storeRecipe(){
    const recipes=this.recipeService.getRecipes();
     this.http.put('https://foodart-recipe-book-default-rtdb.asia-southeast1.firebasedatabase.app/FoodArtrecipes.json',recipes).subscribe(
      (resData)=>{
         console.log(resData);
      }
     );
   }
     
   fetchData(){
      return this.http.get<Recipe[]>('https://foodart-recipe-book-default-rtdb.asia-southeast1.firebasedatabase.app/FoodArtrecipes.json').pipe(map(
         recipe=>{
          return recipe.map(recipe=>{
             return {...recipe,ingredients:recipe.ingredients?recipe.ingredients:[]}
          })
         }
       ),tap((res:Recipe[])=>{
          this.recipeService.setRecipes(res);
       }));
   }
}
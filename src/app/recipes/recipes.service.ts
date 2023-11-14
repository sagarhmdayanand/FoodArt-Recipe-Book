import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../shared/recipe.model";
import { ingredients } from "../shared/infrdients.model";
import { shoppingListService } from "../shopping-list/shoppingList.service";
import {Subject} from 'rxjs';

@Injectable({providedIn:'root'})
export class recipeService{
   
    private recipes:Recipe[]=[]; 

    recipesChanged=new Subject<Recipe[]>();
    constructor(private slService:shoppingListService){}
//  private recipes:Recipe[]=[
//         new Recipe('A Test Recipe','This is simply a test','https://www.sipandfeast.com/wp-content/uploads/2022/09/spaghetti-carbonara-recipe-snippet.jpg',
//         [
//             new ingredients('meat',1),
//             new ingredients('Buns',1)
//         ])
//        ];

 getRecipes(){
    return this.recipes.slice();
 }

 addIngredientsToShoppingList(ingredient:ingredients[]){
    this.slService.toAddList(ingredient);
 }

 setRecipes(recipes:Recipe[]){
    this.recipes=recipes;
    this.recipesChanged.next(this.recipes.slice());
 }

 getRecipe(index:number){
     return this.recipes[index];
 }

 addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
 }

 updateRecipe(newRecipe:Recipe,index:number){
    this.recipes[index]=newRecipe;
    this.recipesChanged.next(this.recipes.slice());
 }

 deleteRecipe(index:number){
   this.recipes.splice(index,1);
   this.recipesChanged.next(this.recipes.slice());
 }
}
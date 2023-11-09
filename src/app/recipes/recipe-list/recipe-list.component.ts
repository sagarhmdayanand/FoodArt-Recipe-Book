import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {Recipe} from '../../shared/recipe.model';
import { recipeService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat/Subscription';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes!:Recipe[];
  subscription!:Subscription;

   constructor(private rcpSrv:recipeService,private router:Router,private route:ActivatedRoute){}

   ngOnInit(){
    this.subscription=this.rcpSrv.recipesChanged.subscribe(
      (recipe:Recipe[])=>{
        this.recipes=recipe;
      }
    )
    this.recipes=this.rcpSrv.getRecipes();
   }

   onNewRecipe(){
     this.router.navigate(['new'],{relativeTo:this.route});
   }

   ngOnDestroy(){
    this.subscription.unsubscribe();
   }
}

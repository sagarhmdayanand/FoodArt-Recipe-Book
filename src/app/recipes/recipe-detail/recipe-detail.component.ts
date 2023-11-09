import { Component,Input } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { recipeService } from '../recipes.service';
import { ActivatedRoute, Params,Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  recipe!:Recipe;
   id!:number;
   constructor(private rcpSrv:recipeService,private route:ActivatedRoute,private router:Router){}
  
   ngOnInit(){
    const id=this.route.params.subscribe(
      (params:Params)=>{
          this.id=+params['id'];
          this.recipe=this.rcpSrv.getRecipe(this.id);
      }
    )
   }

   onAddToShoppingList(){
      this.rcpSrv.addIngredientsToShoppingList(this.recipe.ingredients);
   }

   onEditRecipe(){
     this.router.navigate(['edit'],{relativeTo:this.route});
   }

   onDeleteRecipe(){
    this.rcpSrv.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
   }
}

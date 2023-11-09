import { NgModule } from "@angular/core";
import { sharedModule } from "../shared/shared.module";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipesComponent } from "./recipes.component";
import { RouterModule } from "@angular/router";
import { recipeRoutingModule } from "./recipe-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
   declarations:[
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipesComponent
   ],
   imports:[
      RouterModule,
      CommonModule,
      recipeRoutingModule,
      ReactiveFormsModule,
      sharedModule
   ]
})
export class recipesModule{

}
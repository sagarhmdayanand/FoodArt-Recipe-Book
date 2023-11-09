import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RouterModule,Routes } from "@angular/router";
import { recipResolverService } from "./recipe-resolver.service";
import { authGuardService } from "../auth/auth-gaurd.service";

const  appRoutes:Routes=[
  {path:'',component:RecipesComponent,canActivate:[authGuardService],children:[
    {path:'new',component:RecipeEditComponent},
    {path:':id',component:RecipeDetailComponent,resolve:[recipResolverService]},
    {path:':id/edit',component:RecipeEditComponent,resolve:[recipResolverService]}
  ]}
];

@NgModule({
   imports:[RouterModule.forChild(appRoutes)],
   exports:[RouterModule]
})
export class recipeRoutingModule{

}
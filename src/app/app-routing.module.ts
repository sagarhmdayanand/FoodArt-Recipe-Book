import { NgModule } from "@angular/core";
import {Routes,RouterModule, PreloadingStrategy, PreloadAllModules} from "@angular/router";

const appRoutes:Routes=[
    {path:'', redirectTo:'/recipes', pathMatch:'full'},
    {path:'recipes',loadChildren:()=>import('./recipes/recipes.module').then(m=>m.recipesModule)},
    {path:'shoppinglist',loadChildren:()=>import('./shopping-list/shopping.module').then(m=>m.shoppingModule)},
    {path:'auth',loadChildren:()=>import('./auth/auth.module').then(m=>m.authModule)}
];

@NgModule({
  imports:[RouterModule.forRoot(appRoutes,{ preloadingStrategy:PreloadAllModules})],
  exports:[RouterModule]
})

export class AppRoutingModule{
 
}


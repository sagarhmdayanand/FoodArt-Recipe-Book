import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";
import { authGuardService } from "../auth/auth-gaurd.service";

const shoppingRoutes:Routes=[
    {path:'',component:ShoppingListComponent,canActivate:[authGuardService]}
]
@NgModule({
   imports:[RouterModule.forChild(shoppingRoutes)],
   exports:[RouterModule]
})
export class shoppingRoutingModel{
  
}
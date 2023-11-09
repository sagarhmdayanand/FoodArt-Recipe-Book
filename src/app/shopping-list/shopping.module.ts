import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { FormsModule } from "@angular/forms";
import { shoppingRoutingModel } from "./shopping-routing.model";
import { sharedModule } from "../shared/shared.module";

@NgModule({
  declarations:[
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports:[FormsModule,shoppingRoutingModel,sharedModule]
})
export class shoppingModule{
  
}
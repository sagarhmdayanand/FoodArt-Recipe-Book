import { NgModule } from "@angular/core";
import { recipeService } from "./recipes/recipes.service";
import { shoppingListService } from "./shopping-list/shoppingList.service";
// import { authGaurdService } from "./auth/auth-gaurd.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { authInterceptorService } from "./auth/auth-interceptor.service";

@NgModule({
    providers:[
        authInterceptorService,
        {provide:HTTP_INTERCEPTORS,useClass:authInterceptorService,multi:true}
    ]
})
export class coreModule{

}
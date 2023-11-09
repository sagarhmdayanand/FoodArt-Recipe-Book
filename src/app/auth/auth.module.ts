import { NgModule } from "@angular/core";
import {authComponent} from './auth.component'
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { sharedModule } from "../shared/shared.module";

@NgModule({
    declarations:[
        authComponent
    ],
    imports:[CommonModule,FormsModule,RouterModule.forChild([{path:'',component:authComponent}]),sharedModule]
})
export class authModule{

}
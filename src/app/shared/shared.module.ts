import { NgModule } from "@angular/core";
import { alertComponent } from "./alert/alert.component";
import { loadingSpinnerComp } from "./loading_spinner/loading_spinner.component";
import { dropDownComp } from "./dropdown.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[
        alertComponent,
        loadingSpinnerComp,
        dropDownComp
    ],
    imports:[CommonModule],
    exports:[
        alertComponent,
        loadingSpinnerComp,
        dropDownComp,
        CommonModule
    ]
})
export class sharedModule{

}
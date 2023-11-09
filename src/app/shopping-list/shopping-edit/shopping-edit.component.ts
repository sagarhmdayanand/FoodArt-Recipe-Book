import { Component,Output,EventEmitter,OnInit, ViewChild} from '@angular/core';
import { ingredients } from 'src/app/shared/infrdients.model';
import { shoppingListService } from '../shoppingList.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit{
  @ViewChild('f') formVals!:NgForm; 
  editMode=false;
  ingIndex!:number;
  editItem!:ingredients;
  constructor(private slService:shoppingListService){};

  ngOnInit(){
    this.slService.ingClk.subscribe(
     (val:number)=>{
       this.editMode=true;
       this.ingIndex=val;
       this.editItem=this.slService.getSelectedIng(val);
       this.formVals.setValue({
         'username':this.editItem.name,
         'amount':this.editItem.amount
       })
     }
    )
 }

  onSubmit(val:NgForm){
    let formValues=val.value;
    const newIngredient=new ingredients(formValues.username,formValues.amount);
    if(this.editMode){
      this.slService.upDateIngredient(this.ingIndex,newIngredient);
    }
    else{
      this.slService.getAdd(newIngredient);
    }
    this.editMode=false;
    val.reset();
  }
  
  onClear(){
    this.formVals.reset();
    this.editMode=false;
  }

  onDelete(){
     this.slService.deleteIng(this.ingIndex);
     this.onClear();
  }

}

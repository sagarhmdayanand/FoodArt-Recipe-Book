import { Component,DoCheck,OnDestroy,OnInit } from '@angular/core';
import { ingredients } from '../shared/infrdients.model';
import { shoppingListService } from './shoppingList.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy{
  ingredientsList:ingredients[]=[];
  ingSub!:Subscription;  
  editMode=false;

  constructor(private slService:shoppingListService){}
  
  ngOnInit(){
    this.ingredientsList=this.slService.getIngredient();
    this.ingSub=this.slService.ingredientsChanged.subscribe(
      (val:ingredients[])=>{
         this.ingredientsList=val;
      }
    );
  }

  ngOnDestroy(){
     this.ingSub.unsubscribe();
  }

  onIngClk(index:number){
    this.slService.ingClk.next(index);
  }
  
}

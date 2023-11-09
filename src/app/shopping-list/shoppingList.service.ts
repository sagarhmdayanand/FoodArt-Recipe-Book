import {EventEmitter, Injectable} from '@angular/core';
import { ingredients } from "../shared/infrdients.model";
import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class shoppingListService{
    ingredientsChanged=new Subject<ingredients[]>();
    ingClk=new Subject<number>();

    private ingredients:any|null=[new ingredients('spagetti',50),new ingredients('masala',20)];

    getIngredient(){
        return this.ingredients.slice();
    }

    getAdd(item:ingredients){
      this.ingredients.push(item);
      this.ingredientsChanged.next(this.ingredients.slice());
    }

    toAddList(val:ingredients[]){
       this.ingredients.push(...val);
       this.ingredientsChanged.next(this.ingredients.slice());
    }

    getSelectedIng(i:number){
      return this.ingredients[i];
    }

    upDateIngredient(i:number,ing:ingredients){
        this.ingredients[i]=ing;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIng(index:number){
      this.ingredients.splice(index,1);
      this.ingredientsChanged.next(this.ingredients.slice());
    }

}
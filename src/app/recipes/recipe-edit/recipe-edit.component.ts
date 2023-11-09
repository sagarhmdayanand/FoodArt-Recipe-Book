import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { recipeService } from '../recipes.service';
import { Recipe } from '../../shared/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
  id!:number;
  editMode=false;
  recipeForm!:FormGroup;

    constructor(private route:ActivatedRoute,private rcpSrv:recipeService,private router:Router){}

    ngOnInit(){
       this.route.params.subscribe(
        (params:Params)=>{
          this.id=+params['id'];
          this.editMode=params['id']!=null;
          console.log(params['id'],'sds');
          this.initForm();
        }
       )
    }

    onSubmit(){ 
      // const newRecipe=new Recipe(
      //   this.recipeForm.value['name'],
      //   this.recipeForm.value['description'],
      //   this.recipeForm.value['imagePath'],
      //   this.recipeForm.value['ingredients']
      //   );
       if(this.editMode){
         this.rcpSrv.updateRecipe(this.recipeForm.value,this.id);
       }
       else{
        this.rcpSrv.addRecipe(this.recipeForm.value);
       }
       
       this.onCancel();
    }

    onAddIngredient(){
      (<FormArray>this.recipeForm.get('ingredients')).push(
        new FormGroup(
          {
            'name':new FormControl(null,Validators.required),
            'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
          }
        )
      );
    }
    
    private initForm(){
      let recipeName='';
      let recipeImagePath='';
      let recipeDescription='';
      let recipeIngredients:any=new FormArray([]);

      if(this.editMode){
        const recipe=this.rcpSrv.getRecipe(this.id);
        recipeName=recipe.name;
        recipeImagePath=recipe.imagePath;
        recipeDescription=recipe.description;
        if(recipe['ingredients']){
          for(let ingredient of recipe.ingredients){
            recipeIngredients.push(
              new FormGroup({
                'name':new FormControl(ingredient.name,Validators.required),
                'amount':new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            )
          }
        }
      }

      this.recipeForm=new FormGroup({
        'name':new FormControl(recipeName,Validators.required),
        'imagePath':new FormControl(recipeImagePath,Validators.required),
        'description':new FormControl(recipeDescription,Validators.required),
        'ingredients':recipeIngredients
      });
    }

    onCancel(){
      this.router.navigate(['../'],{relativeTo:this.route});
    }

    get controls(){
      return (this.recipeForm.get('ingredients') as FormArray).controls;
    }

    onDeleteIngrident(index:number){
       (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }

}

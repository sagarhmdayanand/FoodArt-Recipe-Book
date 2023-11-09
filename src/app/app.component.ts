import { Component, OnInit,NgModule, ViewChild, ElementRef } from '@angular/core';
import { FormGroup,FormControl, Validators, FormArray } from '@angular/forms';
import { authenticateService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  selectedOption:string='recipe';
  

    // getSelected(val:string){
    //    this.selectedOption=val;
    // }

    //directive concepts
    //services and dependcies injections
    constructor(private authSrv:authenticateService){}
    isActivated=false;
    
    /* reactive approach */
    signupForm!:FormGroup;
    // forbiddenUserNames=['Chris','Anna'];

    ngOnInit(){
      this.authSrv.autoLogin();

      // this.accounts=this.act.account;
      // this.obsSrv.activeClk.subscribe((data:boolean)=>{
      //   this.isActivated=data;
      // });
      
      // this.signupForm=new FormGroup({
      //   'username':new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]),
      //   'email':new FormControl(null,[Validators.required,Validators.email]),
      //   'secret':new FormControl(null),
      //   'gender':new FormControl('male'),
      //   'hobbies':new FormArray([])
      // })

    
    }
    

   onSubmit(){
     console.log(this.signupForm,'see');
   }
  
  
}

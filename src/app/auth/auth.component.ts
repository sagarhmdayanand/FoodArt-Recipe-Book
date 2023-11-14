import {Component, ComponentFactoryResolver, Injectable} from '@angular/core';
import { NgForm } from '@angular/forms';
import { authenticateService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { authResponse } from './auth.service';
import {Router} from '@angular/router';
import { alertComponent } from '../shared/alert/alert.component';

@Component({
  selector:'auth-app',
  templateUrl:'./auth.component.html',
  styleUrls:['./auth.component.css']
})
export class authComponent{
  constructor(private authService:authenticateService,private routes:Router,private componentFactory:ComponentFactoryResolver){}
    isLogin=true;
    isLoading=false;
    error:string='';

    onswitch(){
      this.isLogin=!this.isLogin;
    }

    onSubmit(formData:NgForm){
      if(!formData.valid){
         return;
      }
      const email=formData.value.email;
      const password=formData.value.password;
      let authObs:Observable<authResponse|string>;

      this.isLoading=true;
      if(this.isLogin){
        authObs=this.authService.logIn(email,password);
        this.routes.navigate(['/recipes']);
      }
      else{
        console.log('ok2');
        authObs=this.authService.signUp(email,password);
      }

      authObs.subscribe(
      (res:any)=>{
        this.isLoading=false;
      },
      (error)=>{
        this.error=error;
        this.isLoading=false;
      })

      formData.reset();
    }

    onHandleClose(){
      this.error='';
    }

    private ShowErrorAlert(message:string){
         const alertCmpFactory=this.componentFactory.resolveComponentFactory(alertComponent);
    }
}
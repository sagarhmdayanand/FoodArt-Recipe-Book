import { Injectable } from "@angular/core";
import { HttpClient,HttpErrorResponse} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import {BehaviorSubject, throwError} from 'rxjs';
import {tap} from 'rxjs/operators';
import { User } from "src/user.model";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

export interface authResponse{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered:string 
}

@Injectable({providedIn:'root'})
export class authenticateService{
   constructor(private http:HttpClient,private route:Router){}

   user=new BehaviorSubject<User>(null!);
   private tokenExpirationTimer:any;

    signUp(email:string,psw:string){
        return this.http.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,
        {
            email:email,
            password:psw,
            returnSecureToken:true
        }).pipe(
            catchError(this.handleError),tap(resData=>{
                if (typeof resData === 'string') {
                    // Handle the case where resData is a string
                  } else {
                    // Assuming resData is of type 'authResponse'
                    // this.handleauthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                  }
            })
        )
    }

    logIn(email:string,psw:string){
        return this.http.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
        {
            email:email,
            password:psw,
            returnSecureToken:true
        }).pipe(
            catchError(this.handleError),tap(resData=>{
                if (typeof resData === 'string') {
                    // Handle the case where resData is a string
                  } else {
                    // Assuming resData is of type 'authResponse'
                    this.handleauthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                  }
            })
        );
    }

    autoLogin(){

        let userDataJSON=localStorage.getItem('userData');
        let userData!:{
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate:string
        };

        if(userDataJSON){
            userData = JSON.parse(userDataJSON);
            const loadedUser= new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));

            if(loadedUser.token){
                this.user.next(loadedUser);
                const expirationDuration=new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();
                this.autoLogOut(expirationDuration);
            }
       }
       else{
            return;
       }
    }

    logOut(){
        this.user.next(null!);
        this.route.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
          clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer=null;
    }

    autoLogOut(expirationDuration:number){
       this.tokenExpirationTimer=setTimeout(()=>{
        this.logOut();
       },expirationDuration);
    }

    private handleauthentication(email:string,id:string,token:string,expiresIn:number){
        const expirationDate=new Date(new Date().getTime() + expiresIn*1000);
        const user=new User(email,id,token,expirationDate);
        this.user.next(user);
        this.autoLogOut(expiresIn*1000);
        localStorage.setItem('userData',JSON.stringify(user));
    }
 

    private handleError(errorRes:HttpErrorResponse){
            console.log(errorRes,'er');
            let errorMsg='An Unknown error occured!';
            if(!errorRes.error || !errorRes.error.error){
                return errorMsg;
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                errorMsg='This Email Exist Already';
                break;
                case 'OPERATION_NOT_ALLOWED':
                errorMsg='operation not allowed';
                break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMsg='Too Many Attempts try later';
                break;
                case 'EMAIL_NOT_FOUND':
                errorMsg="Email doesn't Exist";
                break;
                case 'INVALID_LOGIN_CREDENTIALS':
                errorMsg="Invalid Credentials";
                break;
              }
            return throwError(errorMsg);
    }
}
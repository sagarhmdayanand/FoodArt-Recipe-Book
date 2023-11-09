import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { authenticateService } from "./auth.service";
import { exhaust, exhaustMap } from "rxjs/operators";
import {tap,map,take} from 'rxjs/operators';

@Injectable()
export class authInterceptorService implements HttpInterceptor{
    constructor(private authsrv:authenticateService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
       return this.authsrv.user.pipe(take(1),exhaustMap((user)=>{
         if(!user){
            return next.handle(req);
         }
          const modifiedReq=req.clone({
            params:new HttpParams().set('auth',user.token!)
          });
          return next.handle(modifiedReq);
       }));
      
   }



}
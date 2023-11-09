import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable,inject } from "@angular/core";
import { Observable } from "rxjs";
import { authenticateService } from "./auth.service";
import {map,take} from 'rxjs/operators';
import { Router } from "@angular/router";

// @Injectable({providedIn:'root'})
// export const authGaurdService: CanActivateFn = (
//    route: ActivatedRouteSnapshot,
//    state: RouterStateSnapshot
//  ): Observable<boolean | UrlTree > | Promise<boolean | UrlTree >| boolean | UrlTree =>{

    
    // here injecting dependencies
//     const authSrv = inject(authenticateService);
//     const router = inject(Router);
//         return  authSrv.user.pipe(take(1),
//         map(data=>{
//             const isAuth=!!data;
//             if(isAuth){
//                 return true;
//             }
//             return router.createUrlTree(['/auth']);
//         }));
// }

// @Injectable({providedIn:'root'})
// export class authGaurdService{
//     constructor(private router: Router,private authSrv:authenticateService) {}

//     canActivateFn(
//         route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot
//     ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
//         return  this.authSrv.user.pipe(take(1),
//         map(data=>{
//             const isAuth=!!data;
//             if(isAuth){
//                 return true;
//             }
//             return this.router.createUrlTree(['/auth']);
//         }));
//     }

    // canActivateChild(route: ActivatedRouteSnapshot,state: RouterStateSnapshot){
    //   return this.canActivateFn(route,state);
    // }
// }


@Injectable({ providedIn: 'root' })
export class authGuardService implements CanActivate {
  constructor(private authService: authenticateService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(
      take(1),
      map(data => {
        const isAuth = !!data;
        if (isAuth) {
          return true;
        }
        else{
            return this.router.createUrlTree(['/auth']);
        }
      })
    );
  }
}
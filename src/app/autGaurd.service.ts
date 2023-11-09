// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, Router,CanActivateChildFn, RouterStateSnapshot,UrlTree } from "@angular/router";
// import { Observable } from "rxjs";
// import { authService } from "./auth.service";

// @Injectable()
// export class authGaurd{
//     constructor(private authService: authService, private router: Router) {}

//     canActivateFn(
//         route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot
//     ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
//         return this.authService.isAuthenticated().then((authenticated: boolean|any) => {
//             if (authenticated) {
//                 return true;
//             } else {
//                 // return this.router.parseUrl('/'); // Use parseUrl for UrlTree
//                 return this.router.navigate(['/'])
//             }
//         });
//     }

//     canActivateChild(route: ActivatedRouteSnapshot,state: RouterStateSnapshot){
//       return this.canActivateFn(route,state);
//     }
// }


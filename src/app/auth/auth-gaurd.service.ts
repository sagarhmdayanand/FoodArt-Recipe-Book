import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable,inject } from "@angular/core";
import { Observable } from "rxjs";
import { authenticateService } from "./auth.service";
import {map,take} from 'rxjs/operators';
import { Router } from "@angular/router";

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
        console.log(isAuth,data,'abcd');
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
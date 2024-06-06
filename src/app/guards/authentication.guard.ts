import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AppStateService } from "../services/app-state.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationGuard implements CanActivate {

  constructor(private appState: AppStateService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.appState.authState.isAuthenticated == true) {
      return true;
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }

}
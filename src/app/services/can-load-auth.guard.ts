import { Injectable } from "@angular/core";
import { AuthStore } from "./auth.store";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { map, first } from "rxjs/operators";

@Injectable()
export class CanLoadAuthGuard implements CanLoad {
  constructor(private auth: AuthStore, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.checkIfAuthenticated();
  }

  private checkIfAuthenticated(): Observable<boolean | UrlTree> {
    return this.auth.isLoggedIn$.pipe(
      first(),
      map((loggedIn) => {
        return loggedIn ? loggedIn : this.router.parseUrl("/login");
      })
    );
  }
}

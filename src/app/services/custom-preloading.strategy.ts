import { PreloadingStrategy, Route } from "@angular/router";

import { Injectable } from "@angular/core";
import { Observable, of, timer } from "rxjs";
import { flatMap } from "rxjs/operators";

@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data["preload"]) {
      return load();
    } else {
      return of(null);
    }
  }
}

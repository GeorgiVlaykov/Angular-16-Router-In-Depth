import { NgModule } from "@angular/core";
import {
  Routes,
  RouterModule,
  PreloadAllModules,
  UrlSerializer,
} from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AboutComponent } from "./about/about.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanLoadAuthGuard } from "./services/can-load-auth.guard";
import { CustomPreloadingStrategy } from "./services/custom-preloading.strategy";
import { ChatComponent } from "./chat/chat.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "courses",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  { path: "about", component: AboutComponent },
  // Loazy loading of modules =>
  {
    path: "courses",
    canLoad: [CanLoadAuthGuard],
    loadChildren: () =>
      import("./courses/courses.module").then((m) => m.CoursesModule),
    data: {
      preload: true,
    },
  },
  {
    path: "helpdesk-chat",
    component: ChatComponent,
    outlet: "chat",
  },
  // Fallback path that matches all routes
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloads all modules (including lazy loaded modules) EXCEPT the ones protected with canLoad guard
      preloadingStrategy: PreloadAllModules,
      // custom preloading strategy depending on what we have set in data => preload flag
      // preloadingStrategy: CustomPreloadingStrategy,
      //
      // to start logging all events about routing, useful for debugging:
      // enableTracing: true
      //
      // enable hash, usegul if we cannot setup the server to always return the index.html page
      // useHash: true
      //
      // top, enabled, disabled (default, but enabled will be set as the default in the future)
      // scrollPositionRestoration: "enabled",
      //
      // instead of using route.parent, we can make the parent's snapshot in the child with:
      // paramsInheritanceStrategy: 'always'
      //
      // fix to an angular bug -> // vs ../ to go to parent
      // relativeLinkResolution: 'corrected'
      //
      // malformedUriErrorHandler: (
      //   error: URIError,
      //   urlSerializer: UrlSerializer,
      //   url: string
      // ) => urlSerializer.parse("/page-not-found"),
    }),
  ],
  exports: [RouterModule],
  providers: [CanLoadAuthGuard],
})
export class AppRoutingModule {}

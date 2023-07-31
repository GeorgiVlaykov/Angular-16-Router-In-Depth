import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";
import { Course } from "../model/course";
import { CoursesService } from "./courses.service";
import { LessonSummary } from "../model/lesson-summary";

@Injectable()
export class LessonsResolver implements Resolve<LessonSummary[]> {
  constructor(private courseService: CoursesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<LessonSummary[]> {
    const courseUrl = route.paramMap.get("courseUrl");
    return this.courseService
      .loadAllCourseLessonsSummary(courseUrl)
      .pipe(first());
  }
}

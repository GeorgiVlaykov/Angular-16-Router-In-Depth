import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { shareReplay } from "rxjs/operators";
import { Course } from "../model/course";
import { CoursesService } from "./courses.service";
import { LessonSummary } from "../model/lesson-summary";
import { LessonDetail } from "../model/lesson-detail";

@Injectable()
export class LessonDetailResolver implements Resolve<LessonDetail> {
  constructor(private courseService: CoursesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<LessonDetail> {
    const courseUrl = route.parent.paramMap.get("courseUrl"); // get from parent route
    const lessonsSeqNo = route.paramMap.get("lessonSeqNo");
    console.log(courseUrl, lessonsSeqNo);

    return this.courseService
      .loadLessonDetail(courseUrl, lessonsSeqNo)
      .pipe(shareReplay());
  }
}

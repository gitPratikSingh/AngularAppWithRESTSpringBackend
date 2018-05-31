import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { BackendApiService } from "./services/backend-api.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent, CoursesComponent, CourseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [BackendApiService],
  bootstrap: [AppComponent]
})

export class AppModule { }


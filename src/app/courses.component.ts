import { Component } from '@angular/core';
import {BackendApiService} from "./services/backend-api.service";

// decorator function
@Component({
  selector: 'courses',
  template: `
    <h1>{{ "Courses " + getTitle() }}</h1>
    <br>
    <ul>
      
      <li *ngFor="let course of courses">
        {{ course }}
      </li>
      
    </ul>
  
  `
})

export class CoursesComponent {

  title = "Course Title";
  courses

  getTitle() {
    return this.title;
  }


  constructor(service: BackendApiService){
    this.courses = service.getCourses();
  }

}

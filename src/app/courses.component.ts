import { Component } from '@angular/core';

// decorator function
@Component({
  selector: 'courses',
  template: `
    <h1>{{ "Courses " + getTitle() }}</h1>
    <br>
    <ul>
      
      <li *ngFor="let course of getCourses()">
        {{ course }}
      </li>
      
    </ul>
  
  `
})

export class CoursesComponent {

  title = "Course Title";
  courses = ['course 1', 'course 2', 'course 3', 'course 4'];

  getTitle() {
    return this.title;
  }

  getCourses() {
    return this.courses;
  }

}


export class BackendApiService {

  constructor() { }

  courses = ['course 1', 'course 2', 'course 3', 'course 4'];

  getCourses() {
    return this.courses;
  }
}

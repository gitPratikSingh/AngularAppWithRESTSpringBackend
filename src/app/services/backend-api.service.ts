import { Injectable} from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable()
export class BackendApiService {

  constructor(private _http: HttpClient) { }

  private bchartdata:String;

  getBurnDownChartData({orgId=4, scopeId=123}:{orgId?: Number, scopeId?: Number}={}){
    return this._http.get('assets/scope_data.json').pipe(map((res: Response) => res));
  }

  courses = ['course 1', 'course 2', 'course 3', 'course 4'];

  getCourses() {
    return this.courses;
  }
}

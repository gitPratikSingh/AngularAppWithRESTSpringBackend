import { Component } from '@angular/core';
import { BackendApiService } from "./services/backend-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';

  constructor(private _dataSource: BackendApiService) { }

  ngOnInit() {
    this._dataSource.getBurnDownChartData().subscribe(res => console.log(res));
  }

}

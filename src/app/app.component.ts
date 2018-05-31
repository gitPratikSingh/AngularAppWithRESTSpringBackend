import {Component, ViewChild, ElementRef} from '@angular/core';
import { BackendApiService } from "./services/backend-api.service";
import { Chart } from 'chart.js';
import {NULL_EXPR} from "@angular/compiler/src/output/output_ast";
import {NoOutputNamedAfterStandardEventRule} from "codelyzer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  chart = [];

  constructor(private _dataSource: BackendApiService) { }

  daysBetween(date1: Date, date2:Date){
    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    let date1_ms = date1.getTime()
    let date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    let difference_ms = Math.abs(date1_ms - date2_ms)

    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY) + 1
  }

  ngOnInit() {

    this._dataSource.getBurnDownChartData().subscribe(res => {
        console.log(res)
        let allowedBehaviorsArray = res['services'].map(res => res.allowedBehaviors)

        let createdAtArray = []


        allowedBehaviorsArray.forEach((res)=>{
          res.forEach(inres => {

            let jsDate = new Date(inres.createdAt * 1000)
            jsDate.setHours(0,0,0,0);
            createdAtArray.push(jsDate)

          })
        })

        let maxDate: Date = createdAtArray[0]
        let minDate: Date = createdAtArray[createdAtArray.length-1]

        let label_steps:number = this.daysBetween(maxDate, minDate)
        let labels = []
        let data = []

        let itr
        for(itr=0; itr<label_steps; itr++){
          let label: Date = new Date()
          label.setDate(minDate.getDate() + itr)
          label.setHours(0,0,0,0);
          labels.push(label.toLocaleDateString('en', {year: 'numeric', month:'short', day:'numeric'}))
        }

        console.log(maxDate)
        console.log(minDate)
        console.log(labels)

        const dataMap = new Map()

        createdAtArray.forEach(elem => {
          elem = elem.toLocaleDateString('en', {year: 'numeric', month:'short', day:'numeric'})

          if (dataMap.has(elem)){
            dataMap.set(elem, dataMap.get(elem)+1)
          }else {
            dataMap.set(elem, 1)
          }
        })

        console.log(dataMap)

        labels.forEach(elem => {

          if (dataMap.has(elem)){
            data.push(dataMap.get(elem))
          }else {
            data.push(0)
          }
        })

        console.log(data)
        // chart section
        let ctx = document.getElementById("canvas");
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: 'Behavior Burndown Chart',
                data: data,
                backgroundColor:
                  'rgba(255, 99, 132, 0.2)',
                borderColor:
                  'rgba(255,99,132,1)',
                borderWidth: 1
              }]
            }
          })
        }
    );
  }

}

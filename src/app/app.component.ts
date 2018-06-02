import {Component, ViewChild, ElementRef} from '@angular/core';
import { BackendApiService } from "./services/backend-api.service";
import { Chart } from 'chart.js';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  chart = [];

  constructor(private _dataSource: BackendApiService) { }

  @ViewChild('content') content: ElementRef
  downloadPDF() {

    let doc = new jsPDF()

    let specialElementHandlers = {
      '#editor': function(element, renderer) {
        return true
      }
    }

    let content = this.content.nativeElement

    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190,
      'elementhandlers': specialElementHandlers
    })

    doc.save('content.pdf')

  }

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
          label.setTime(minDate.getTime() + itr * 86400000)
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
                label: 'Behavior Burndown Charts',
                data: data,
                backgroundColor:
                  'rgba(14, 6, 255, 0.6)',
                borderColor:
                  'rgba(14, 6, 255, 1)',
                borderWidth: 1
              }]
            },

            options: {
              legend: {display: false},
              title: {
                display: true,
                text: 'Behavior Burndown Chart',
                fontSize: 16
              },
              scales: {
                yAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: 'Behaviors'
                    }
                  }
                ],
                xAxes: [
                  {
                    scaleLabel: {
                      display: false,
                      labelString: 'Date',
                      fontSize: 16
                    }
                  }
                ]
              },
              tooltips: {
                enabled: true,
                mode: 'single',
                callbacks: {
                  label: function(tooltipItems, data) {
                    return tooltipItems.yLabel +" new behaviors";
                  }
                }
              },
            }

        })
        }
    );
  }

}

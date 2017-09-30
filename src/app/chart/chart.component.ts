import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public initialized = false;

  dateFormat = 'DD.MM.YYYY';
  chartLabels: any[] = [];
  chartDatasets: any[] = [];

  chartOptions= {
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          displayFormats: {
              quarter:  'day'
          }
        },
        distribution: 'series',
        ticks: {
          source: 'auto'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Closing price (CHF)'
        }
      }]
    }
  }

  constructor(private dataService: DataService) { }

  ngOnInit() {
     this.dataService.GetChartData().then(chartDatas => {
      for (let chartData of chartDatas) {
        this.chartDatasets.push({
          label: chartData.Key,
          data: chartData.DataPoints,
          type: 'line',
          pointRadius: 0,
          fill: false,
          lineTension: 0,
          borderWidth: 2
        });
      }

      for (let datapoint of chartDatas[0].DataPoints) {
        this.chartLabels.push(datapoint.t);
      }
      this.initialized = true;
   });

  }

}

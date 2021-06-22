import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as moment from "moment";
import {
  ChartComponent,
  ApexChart,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexMarkers,
  ApexAnnotations,
  ApexStroke,
  ApexNoData,
} from "ng-apexcharts";
import { DashboardService } from '../../services/dashboard.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis | ApexYAxis[];
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  annotations: ApexAnnotations;
  colors: any;
  toolbar: any;
  noData: ApexNoData;
};

@Component({
  selector: 'app-adtv-chart',
  templateUrl: './adtv-chart.component.html',
  styleUrls: ['./adtv-chart.component.css']
})
export class AdtvChartComponent implements OnInit {
  @Input() symbol: string;
  private adtv20Data = [];
  @ViewChild("chartObj", { static: false }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public activeOptionButton = "all";
  public updateOptionsData;

  initChart(): void {
    this.chartOptions = {
      colors:['#F44336', '#E91E63', '#9C27B0'],
      series: [
        {
          name: "ADTV 20",
          type: "area",
          data: this.adtv20Data,
        },
      ],
      chart: {
        type: "area",
        height: 390,
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: "category",  
        tickAmount: 10,
        labels: {
          formatter: function(val) {
            return moment(val).locale('en-gb').format('l');
          }
        },
      },
      yaxis: {
        title: {
          text: "ADTV 20"
        },
        labels: {
          formatter: function (value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
        },
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy"
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
      noData: {
        text: "Loading..."
      },
      stroke: {
        curve: "straight",
        width: 2
      },
    };
  }

  public updateOptions(option: any): void {
    this.activeOptionButton = option;
    this.chart.updateOptions(this.updateOptionsData[option], false, true, true);
    console.log(this.updateOptionsData['1m'])
  }

  private getADTV20(symbol: string): void {
    this._dashboardService
    .getADTV20(symbol)
    .subscribe(adtv20Data => {
      for (var i = 0; i < adtv20Data.length; i ++) {
        const adtv20 = adtv20Data[i];
        const adtv20Obj = {
          x: new Date(adtv20.date).getTime(),
          y: adtv20.adtv20
        }
        this.adtv20Data.push(adtv20Obj);
      }
      const toDate = this.adtv20Data[this.adtv20Data.length-1].x;
      console.log(toDate);
      const updateOptionsData = {
        "5d": {
          xaxis: {
            min: toDate-5*86400000,
            max: toDate,
            type: "category",  
            tickAmount: 5,
            labels: {
              formatter: function(val) {
                return moment(val).locale('en-gb').format('l');
              }
            },
          }
        },
        "1m": {
          xaxis: {
            min: toDate-30*86400000,
            max: toDate,
            type: "category",  
            tickAmount: 20,
            labels: {
              formatter: function(val) {
                return moment(val).locale('en-gb').format('l');
              }
            },
          }
        },
        "2m": {
          xaxis: {
            min: toDate-2*30*86400000,
            max: toDate,
            type: "category",  
            tickAmount: 20,
            labels: {
              formatter: function(val) {
                return moment(val).locale('en-gb').format('l');
              }
            },
          }
        },
        "3m": {
          xaxis: {
            min: toDate-3*30*86400000,
            max: toDate,
            type: "category",  
            tickAmount: 20,
            labels: {
              formatter: function(val) {
                return moment(val).locale('en-gb').format('l');
              }
            },
          }
        },
        all: {
          xaxis: {
            min: undefined,
            max: undefined,
            type: "category",  
            tickAmount: 10,
            labels: {
              formatter: function(val) {
                return moment(val).locale('en-gb').format('l');
              }
            },
          }
        }
      };
      this.updateOptionsData = updateOptionsData;
    });
  }

  constructor(
    private _dashboardService: DashboardService,
  ) { 
    this.initChart();
  }

  ngOnInit(): void {
    this.getADTV20(this.symbol);
  }
}

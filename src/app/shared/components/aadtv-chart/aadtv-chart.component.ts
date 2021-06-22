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
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-aadtv-chart',
  templateUrl: './aadtv-chart.component.html',
  styleUrls: ['./aadtv-chart.component.css']
})
export class AadtvChartComponent implements OnInit {
  @Input() symbol: string;
  private tradingPriceData = [];
  private tradingVolumeData = [];
  @ViewChild("chartObj", { static: false }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public activeOptionButton = "all";
  public updateOptionsData;

  initChart(): void {
    this.chartOptions = {
      series: [
        {
          name: "Price",
          type: "area",
          data: this.tradingPriceData,
        },
        {
          name: "Volume",
          type: "bar",
          data: this.tradingVolumeData,
        },
      ],
      chart: {
        type: "area",
        height: 350,
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: "category",
        tickAmount: 5,
        labels: {
          formatter: function(val) {
            return moment(val).format("MMM DD");
          }
        }
      },
      yaxis: [
        {
          title: {
            text: "Share Price"
          },
        },
        {
          opposite: true,
          title: {
            text: "Shares Traded"
          },
          labels: {
            formatter: function (value) {
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          },
        }
      ],
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
        width: 3
      },
    };
  }

  public updateOptions(option: any): void {
    this.activeOptionButton = option;
    this.chart.updateOptions(this.updateOptionsData[option], false, true, true);
  }

  private getTradingData(symbol: string): void {
    this._dashboardService
    .getCompanyTrading(symbol)
    .subscribe(tradingData => {
      for (var i = 0; i < tradingData.length; i ++) {
        const trading = tradingData[i];
        const tradingPriceObj = {
          x: new Date(trading.market_date).getTime(),
          y: trading.close,
        };
        const tradingVolumeObj = {
          x: new Date(trading.market_date).getTime(),
          y: trading.volume
        }
        this.tradingPriceData.push(tradingPriceObj);
        this.tradingVolumeData.push(tradingVolumeObj);
      }
      const toDate = this.tradingPriceData[this.tradingPriceData.length-1].x;
      console.log(toDate);
      const updateOptionsData = {
        "5d": {
          xaxis: {
            min: toDate-5*86400000,
            max: toDate,
            tickAmount: 5,
            labels: {
              formatter: function(val) {
                return moment(val).format("MMM DD");
              }
            }
          }
        },
        "1m": {
          xaxis: {
            min: toDate-30*86400000,
            max: toDate,
            tickAmount: 5,
            labels: {
              formatter: function(val) {
                return moment(val).format("MMM DD");
              }
            }
          }
        },
        "2m": {
          xaxis: {
            min: toDate-2*30*86400000,
            max: toDate,
            tickAmount: 5,
            labels: {
              formatter: function(val) {
                return moment(val).format("MMM DD");
              }
            }
          }
        },
        "3m": {
          xaxis: {
            min: toDate-3*30*86400000,
            max: toDate,
            tickAmount: 5,
            labels: {
              formatter: function(val) {
                return moment(val).format("MMM DD");
              }
            }
          }
        },
        all: {
          xaxis: {
            min: undefined,
            max: undefined,
            tickAmount: 5,
            labels: {
              formatter: function(val) {
                return moment(val).format("MMM DD");
              }
            }
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
    this.getTradingData(this.symbol);
  }

}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import * as moment from "moment";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  fill: ApexFill;
};

@Component({
  selector: 'app-trading-chart',
  templateUrl: './trading-chart.component.html',
  styleUrls: ['./trading-chart.component.css']
})
export class TradingChartComponent implements OnInit {
  @Input() symbol: string;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  private tradingPriceData = [];
  private tradingVolumeData = [];

  constructor(
    private dashboardService: DashboardService,
  ) {
    this.initChartData();
  }

  private initChartData(): void {
    this.chartOptions = {
      series: [
        {
          name: "Price",
          type: "area",
          data: this.tradingPriceData
        },
        {
          name: "Trading Volume",
          type: "column",
          data: this.tradingVolumeData
        }
      ],
      chart: {
        height: '390',
        type: "area",
        zoom: {
          enabled: true,
        },
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: false,
          },
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
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight",
        width: 2
      },
      title: {
        text: '',
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
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
      ]
    }
  }

  ngOnInit(): void {
    this.getTradingData(this.symbol);
    console.log(this.tradingPriceData);
    console.log(this.tradingVolumeData);
    console.log(this.symbol);
  }

  private getTradingData(symbol: string) {
    this.dashboardService
    .getCompanyTrading(symbol)
    .subscribe(tradings => {
      for(var i = 0; i < tradings.length; i++) {
        const trading = tradings[i];
        const tradingPrice = {
          x: trading.market_date,
          y: trading.close
        }
        const tradingVolume = {
          x: trading.market_date,
          y: trading.volume
        }
        this.tradingPriceData.push(tradingPrice);
        this.tradingVolumeData.push(tradingVolume);
      }
    });
  }
}

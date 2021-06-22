import { Component, Input } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-search-view-tabs-summary',
  templateUrl: './search-view-tabs-summary.component.html',
  styleUrls: ['./search-view-tabs-summary.component.css']
})
export class SearchViewTabsSummaryComponent {
  @Input() symbol: string;
  company_ticker;
  company_name;
  isin;
  exchange;
  currency;
  market_date;
  am_uid;
  open;
  high;
  low;
  volume;
  vwap;
  market_cap;
  change_percent;
  price;
  adtv;
  adtv5;
  adtv10;
  adtv20;
  adtv60;
  adtv120;
  aadtv;
  aadtv5;
  aadtv10;
  aadtv20;
  aadtv60;
  aadtv120;

  constructor(
    private _dashboardService: DashboardService,
  ) { }

  private getCompanyDetailData(symbol: string) {
    this._dashboardService
    .getCompanyDetail(symbol)
    .subscribe(data => {
      const companyDetailData = data[0];
      this.company_ticker = companyDetailData.company_ticker;
      this.company_name   = companyDetailData.company_name;
      this.isin           = companyDetailData.isin;
      this.exchange       = companyDetailData.exchange;
      this.currency       = companyDetailData.currency;
      this.market_date    = companyDetailData.market_date;
      this.am_uid         = companyDetailData.am_uid;
      this.open           = companyDetailData.open;
      this.high           = companyDetailData.high;
      this.low            = companyDetailData.low;
      this.volume         = companyDetailData.volume;
      this.vwap           = companyDetailData.vwap;
      this.market_cap     = companyDetailData.market_cap;
      this.change_percent = companyDetailData.change_percent;
      this.price          = companyDetailData.price;
      this.adtv           = companyDetailData.adtv;
      this.adtv5          = companyDetailData.adtv5;
      this.adtv10         = companyDetailData.adtv10;
      this.adtv20         = companyDetailData.adtv20;
      this.adtv60         = companyDetailData.adtv60;
      this.adtv120        = companyDetailData.adtv120;
      this.aadtv          = companyDetailData.aadtv;
      this.aadtv5         = companyDetailData.aadtv5;
      this.aadtv10        = companyDetailData.aadtv10;
      this.aadtv20        = companyDetailData.aadtv20;
      this.aadtv60        = companyDetailData.aadtv60;
      this.aadtv120       = companyDetailData.aadtv120;
    });
  }

  ngOnChanges(): void {
    this.getCompanyDetailData(this.symbol);
  }
}

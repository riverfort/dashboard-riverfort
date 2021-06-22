import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.css']
})
export class CompanyCardComponent implements OnInit {
  @Input() symbol: string;
  companyTicker: string;
  companyName: string;
  exchange: string;
  currency: string;
  cap: string;
  price: string;

  constructor(
    private _dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.getProfileData(this.symbol);
    this.getQuoteData(this.symbol);
  }

  ngOnChanges(): void {
    this.getProfileData(this.symbol);
    this.getQuoteData(this.symbol);
  }

  private getProfileData(symbol: string) {
    this._dashboardService
    .getCompanyProfile(symbol)
    .subscribe(data => {
      this.companyTicker = data.company_ticker;
      this.companyName = data.company_name;
      this.exchange = data.exchange;
      this.currency = data.currency;
    });
  }

  private getQuoteData(symbol: string) {
    this._dashboardService
    .getCompanyQuote(symbol)
    .subscribe(data => {
      this.cap = data.market_cap;
      this.price = data.price;
    });
  }
}

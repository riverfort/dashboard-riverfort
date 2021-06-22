import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { config } from 'src/app/config';
import { CompanyProfile } from '../../models/companyProfile';
// material
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
// rxjs
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, startWith, map, switchMap } from 'rxjs/operators';
// services
import { DashboardService } from '../../services/dashboard.service';
import { InteractionService } from '../../services/interaction.service';
// components
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';

@Component({
  selector: 'app-company-trading-table',
  templateUrl: './company-trading-table.component.html',
  styleUrls: ['./company-trading-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CompanyTradingTableComponent implements OnInit {
  expandedElement: CompanyProfile | null;
  displayedColumns: string[] = ['company_ticker', 'company_name', "change_percent", 'market_cap', 'adtv5', "adtv10", 'adtv20', 'adtv60', "industry", "exchange"];
  exampleDatabase: ExampleHttpDatabase | null;
  filteredAndPagedCompanies: Observable<CompanyProfile[]>;

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Other states:
  hiddenMktCapFilterBadge = true;
  tableDataCategory;

  // Filters dialog values:
  industry: string;
  minMktCap: number;
  maxMktCap: number;

  constructor(
    private _httpClient: HttpClient,
    private _cdr: ChangeDetectorRef,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _dashboardService: DashboardService,
    private _interactionService: InteractionService,
    private _dialog: MatDialog) {
      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    }
  
  ngOnInit(): void {
    this._activatedRoute.data.subscribe(data => {
      switch(data.kind) {
        case "filter-exchange":
          this.tableDataCategory = "filter-exchange";
          return;
        case "filter-industry":
          this.tableDataCategory = "filter-industry";
          return;
        case "filter-mktcap":
          this.tableDataCategory = "filter-mktcap";
          return;
        case "filter-adtv20":
          this.tableDataCategory = "filter-adtv20";
          return;
        case "filter-exchange-industry":
          this.tableDataCategory = "filter-exchange-industry";
          return;
        case "filter-exchange-mktcap":
          this.tableDataCategory = "filter-exchange-mktcap";
          return;
        case "filter-exchange-adtv20":
          this.tableDataCategory = "filter-exchange-adtv20";
          return;
        case "filter-industry-mktcap":
          this.tableDataCategory = "filter-industry-mktcap";
          return;
        case "filter-industry-adtv20":
          this.tableDataCategory = "filter-industry-adtv20";
          return;
        case "filter-industry-mktcap-adtv20":
          this.tableDataCategory = "filter-industry-mktcap-adtv20";
          return;
        case "filter-exchange-industry-mktcap":
          this.tableDataCategory = "filter-exchange-industry-mktcap";
          return;
        case "filter-exchange-industry-adtv20":
          this.tableDataCategory = "filter-exchange-industry-adtv20";
          return;
        case "filter-exchange-industry-mktcap-adtv20":
          this.tableDataCategory = "filter-exchange-industry-mktcap-adtv20";
          return;
        case "filter-mktcap-adtv20":
          this.tableDataCategory = "filter-mktcap-adtv20";
          return;
        // case "filter-exchange-industry":
        //   this.tableDataCategory = "filter-exchange-industry";
        //   return;
        // case "filter-exchange-industry-minMktCap-maxMktCap":
        //   this.tableDataCategory = "filter-exchange-industry-minMktCap-maxMktCap";
        //   return;
        case "all":
          this.tableDataCategory = "all";
          return;
        case "exchange":
          this.tableDataCategory = "exchange";
          return;
        case "country":
          this.tableDataCategory = "country";
          return;
        case "asia-pacific":
          this.tableDataCategory = "asia-pacific";
          return;
        case "africa":
          this.tableDataCategory = "africa";
          return;
        case "europe":
          this.tableDataCategory = "europe";
          return;
        case "north-america":
          this.tableDataCategory = "north-america";
          return;
        case "south-america":
          this.tableDataCategory = "south-america";
          return;
      }
    });
  }

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);
    this.filteredAndPagedCompanies = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          switch (this.tableDataCategory) {
            case "filter-exchange":
              this._interactionService.changeSelectedFiltersMessage([
                this._activatedRoute.snapshot.paramMap.get('exchange'),
              ]);
              return this.exampleDatabase!.getCompanyListByExchange(this._activatedRoute.snapshot.paramMap.get('exchange'),
                this.sort.active, this.sort.direction, this.paginator.pageIndex);
            case "filter-industry":
              this._interactionService.changeSelectedFiltersMessage([
                this._activatedRoute.snapshot.paramMap.get('industry'),
              ]);
              return this.exampleDatabase!.getCompanyListByIndustry(this._activatedRoute.snapshot.paramMap.get('industry'),
                this.sort.active, this.sort.direction, this.paginator.pageIndex);
            case "filter-mktcap":
              this._interactionService.changeSelectedFiltersMessage([
                `Mkt Cap min: ${this.formatNumber(this._activatedRoute.snapshot.paramMap.get('mktcapMin'))}`,
                `Mkt Cap max: ${this.formatNumber(this._activatedRoute.snapshot.paramMap.get('mktcapMax'))}`,
              ]);
              return this.exampleDatabase!.getCompanyListByMktCap(
                this._activatedRoute.snapshot.paramMap.get('mktcapMin'),
                this._activatedRoute.snapshot.paramMap.get('mktcapMax'),
                this.sort.active, this.sort.direction, this.paginator.pageIndex);
            case "filter-adtv20":
              this._interactionService.changeSelectedFiltersMessage([
                `ADTV20 < ${this.formatNumber(this._activatedRoute.snapshot.paramMap.get('adtv20'))}`,
              ]);
              return this.exampleDatabase!.getCompanyListByAdtv20(this._activatedRoute.snapshot.paramMap.get('adtv20'),
                this.sort.active, this.sort.direction, this.paginator.pageIndex);
            case "filter-exchange-industry":
              this._interactionService.changeSelectedFiltersMessage([
                this._activatedRoute.snapshot.paramMap.get('exchange'),
                this._activatedRoute.snapshot.paramMap.get('industry'),
              ]);
              return this.exampleDatabase!.getCompanyListFilteredByExchangeAndIndustry(
                this._activatedRoute.snapshot.paramMap.get('exchange'),
                this._activatedRoute.snapshot.paramMap.get('industry'),
                this.sort.active, this.sort.direction, this.paginator.pageIndex);
            case "filter-exchange-mktcap":
              this._interactionService.changeSelectedFiltersMessage([
                this._activatedRoute.snapshot.paramMap.get('exchange'),
                `Mkt Cap min: ${this.formatNumber(this._activatedRoute.snapshot.paramMap.get('mktcapMin'))}`,
                `Mkt Cap max: ${this.formatNumber(this._activatedRoute.snapshot.paramMap.get('mktcapMax'))}`,
              ]);
              return this.exampleDatabase!.getCompanyListFilteredByExchangeAndMktCap(
                this._activatedRoute.snapshot.paramMap.get('exchange'),
                this._activatedRoute.snapshot.paramMap.get('mktcapMin'),
                this._activatedRoute.snapshot.paramMap.get('mktcapMax'),
                this.sort.active, this.sort.direction, this.paginator.pageIndex);
            case "filter-exchange-adtv20":
              this._interactionService.changeSelectedFiltersMessage([
                this._activatedRoute.snapshot.paramMap.get('exchange'),
                `ADTV20 < ${this.formatNumber(this._activatedRoute.snapshot.paramMap.get('adtv20'))}`,
              ]);
              return this.exampleDatabase!.getCompanyListFilteredByExchangeAndAdtv20(
                this._activatedRoute.snapshot.paramMap.get('exchange'),
                this._activatedRoute.snapshot.paramMap.get('adtv20'),
                this.sort.active, this.sort.direction, this.paginator.pageIndex);
            case "filter-industry-mktcap":
              this._interactionService.changeSelectedFiltersMessage([
                this._activatedRoute.snapshot.paramMap.get('industry'),
                `Mkt Cap min: ${this.formatNumber(this._activatedRoute.snapshot.paramMap.get('mktcapMin'))}`,
                `Mkt Cap max: ${this.formatNumber(this._activatedRoute.snapshot.paramMap.get('mktcapMax'))}`,
              ]);
              return this.exampleDatabase!.getCompanyListFilteredByIndustryAndMktCap(
                this._activatedRoute.snapshot.paramMap.get('industry'),
                this._activatedRoute.snapshot.paramMap.get('mktcapMin'),
                this._activatedRoute.snapshot.paramMap.get('mktcapMax'),
                this.sort.active, this.sort.direction, this.paginator.pageIndex);
            case "filter-industry-adtv20":
              this._interactionService.changeSelectedFiltersMessage([
                this._activatedRoute.snapshot.paramMap.get('industry'),
                `ADTV20 < ${this.formatNumber(this._activatedRoute.snapshot.paramMap.get('adtv20'))}`,
              ]);
              return this.exampleDatabase!.getCompanyListFilteredByIndustryAndAdtv20(
                this._activatedRoute.snapshot.paramMap.get('industry'),
                this._activatedRoute.snapshot.paramMap.get('adtv20'),
                this.sort.active, this.sort.direction, this.paginator.pageIndex);
            case "filter-industry-mktcap-adtv20":
              this._interactionService.changeSelectedFiltersMessage([
                this._activatedRoute.snapshot.paramMap.get('industry'),
                `Mkt Cap min: ${this.formatNumber(this._activatedRoute.snapshot.paramMap.get('mktcapMin'))}`,
                `Mkt Cap max: ${this.formatNumber(this._activatedRoute.snapshot.paramMap.get('mktcapMax'))}`,
                `ADTV20 < ${this.formatNumber(this._activatedRoute.snapshot.paramMap.get('adtv20'))}`,
              ]);
              return this.exampleDatabase!.getCompanyListFilteredByIndustryAndMktCapAndAdtv20(
                this._activatedRoute.snapshot.paramMap.get('industry'),
                this._activatedRoute.snapshot.paramMap.get('mktcapMin'),
                this._activatedRoute.snapshot.paramMap.get('mktcapMax'),
                this._activatedRoute.snapshot.paramMap.get('adtv20'),
                this.sort.active, this.sort.direction, this.paginator.pageIndex);
            case "filter-exchange-industry-mktcap":
              this._interactionService.changeSelectedFiltersMessage([
                this._activatedRoute.snapshot.paramMap.get('exchange'),
                this._activatedRoute.snapshot.paramMap.get('industry'),
                `Mkt Cap min: ${this.formatNumber(this._activatedRoute.snapshot.paramMap.get('mktcapMin'))}`,
                `Mkt Cap max: ${this.formatNumber(this._activatedRoute.snapshot.paramMap.get('mktcapMax'))}`,
              ]);
              return this.exampleDatabase!.getCompanyListFilteredByExchangeAndIndustryAndMktCap(
                this._activatedRoute.snapshot.paramMap.get('exchange'),
                this._activatedRoute.snapshot.paramMap.get('industry'),
                this._activatedRoute.snapshot.paramMap.get('mktcapMin'),
                this._activatedRoute.snapshot.paramMap.get('mktcapMax'),
                this.sort.active, this.sort.direction, this.paginator.pageIndex);
            case "filter-exchange-industry-adtv20":
              this._interactionService.changeSelectedFiltersMessage([
                this._activatedRoute.snapshot.paramMap.get('exchange'),
                this._activatedRoute.snapshot.paramMap.get('industry'),
                `ADTV20 < ${this.formatNumber(this._activatedRoute.snapshot.paramMap.get('adtv20'))}`,
              ]);
              return this.exampleDatabase!.getCompanyListFilteredByExchangeAndIndustryAndAdtv20(
                this._activatedRoute.snapshot.paramMap.get('exchange'),
                this._activatedRoute.snapshot.paramMap.get('industry'),
                this._activatedRoute.snapshot.paramMap.get('adtv20'),
                this.sort.active, this.sort.direction, this.paginator.pageIndex);
            case "filter-exchange-industry-mktcap-adtv20":
              this._interactionService.changeSelectedFiltersMessage([
                this._activatedRoute.snapshot.paramMap.get('exchange'),
                this._activatedRoute.snapshot.paramMap.get('industry'),
                `Mkt Cap min: ${this.formatNumber(this._activatedRoute.snapshot.paramMap.get('mktcapMin'))}`,
                `Mkt Cap max: ${this.formatNumber(this._activatedRoute.snapshot.paramMap.get('mktcapMax'))}`,
                `ADTV20 < ${this.formatNumber(this._activatedRoute.snapshot.paramMap.get('adtv20'))}`,
              ]);
              return this.exampleDatabase!.getCompanyListFilteredByExchangeAndIndustryAndMktCapAndAdtv20(
                this._activatedRoute.snapshot.paramMap.get('exchange'),
                this._activatedRoute.snapshot.paramMap.get('industry'),
                this._activatedRoute.snapshot.paramMap.get('mktcapMin'),
                this._activatedRoute.snapshot.paramMap.get('mktcapMax'),
                this._activatedRoute.snapshot.paramMap.get('adtv20'),
                this.sort.active, this.sort.direction, this.paginator.pageIndex);
            case "filter-mktcap-adtv20":
              this._interactionService.changeSelectedFiltersMessage([
                `Mkt Cap min: ${this.formatNumber(this._activatedRoute.snapshot.paramMap.get('mktcapMin'))}`,
                `Mkt Cap max: ${this.formatNumber(this._activatedRoute.snapshot.paramMap.get('mktcapMax'))}`,
                `ADTV20 < ${this.formatNumber(this._activatedRoute.snapshot.paramMap.get('adtv20'))}`,
              ]);
              return this.exampleDatabase!.getCompanyListFilteredByMktCapAndAdtv20(
                this._activatedRoute.snapshot.paramMap.get('mktcapMin'),
                this._activatedRoute.snapshot.paramMap.get('mktcapMax'),
                this._activatedRoute.snapshot.paramMap.get('adtv20'),
                this.sort.active, this.sort.direction, this.paginator.pageIndex);
            // case "filter-exchange":
            //   this._interactionService.changeSelectedFiltersMessage([
            //     this._activatedRoute.snapshot.paramMap.get('exchange'),
            //   ]);
            //   return this.exampleDatabase!.getCompanyListByExchange(this._activatedRoute.snapshot.paramMap.get('exchange'),
            //     this.sort.active, this.sort.direction, this.paginator.pageIndex);
            // case "filter-exchange-industry":
            //   this._interactionService.changeSelectedFiltersMessage([
            //     this._activatedRoute.snapshot.paramMap.get('exchange'),
            //     this._activatedRoute.snapshot.paramMap.get('industry'),
            //   ]);
            //   return this.exampleDatabase!.getCompanyListFilteredByExchangeAndIndustry(
            //     this._activatedRoute.snapshot.paramMap.get('exchange'),
            //     this._activatedRoute.snapshot.paramMap.get('industry'),
            //     this.sort.active, this.sort.direction, this.paginator.pageIndex);
            // case "filter-exchange-industry-minMktCap-maxMktCap":
            //   this._interactionService.changeSelectedFiltersMessage([
            //     this._activatedRoute.snapshot.paramMap.get('exchange'),
            //     this._activatedRoute.snapshot.paramMap.get('industry'),
            //     `Mkt Cap min: ${this._activatedRoute.snapshot.paramMap.get('minMktCap')}`,
            //     `Mkt Cap max: ${this._activatedRoute.snapshot.paramMap.get('maxMktCap')}`,
            //   ]);
            //   return this.exampleDatabase!.getCompanyListFilteredByExchangeAndIndustryAndMktCap(
            //     this._activatedRoute.snapshot.paramMap.get('exchange'),
            //     this._activatedRoute.snapshot.paramMap.get('industry'),
            //     this._activatedRoute.snapshot.paramMap.get('minMktCap'),
            //     this._activatedRoute.snapshot.paramMap.get('maxMktCap'),
            //     this.sort.active, this.sort.direction, this.paginator.pageIndex);
            case "all":
              this._interactionService.changeSelectedFiltersMessage([]);
              return this.exampleDatabase!.getCompanyList(
                this.sort.active, this.sort.direction, this.paginator.pageIndex);
            case "exchange":
              this._interactionService.changeSelectedFiltersMessage([]);
              return this.exampleDatabase!.getCompanyListByExchange(this._activatedRoute.snapshot.paramMap.get('exchange'),
                this.sort.active, this.sort.direction, this.paginator.pageIndex);
            case "country":
              this._interactionService.changeSelectedFiltersMessage([]);
              return this.exampleDatabase!.getCompanyListByCountry(this._activatedRoute.snapshot.paramMap.get('countryCode'),
              this.sort.active, this.sort.direction, this.paginator.pageIndex);
            case "asia-pacific":
              this._interactionService.changeSelectedFiltersMessage([]);
              return this.exampleDatabase!.getCompanyListByAsiaPacific(
              this.sort.active, this.sort.direction, this.paginator.pageIndex);
            case "africa":
              this._interactionService.changeSelectedFiltersMessage([]);
              return this.exampleDatabase!.getCompanyListByAfrica(
              this.sort.active, this.sort.direction, this.paginator.pageIndex);
            case "europe":
              this._interactionService.changeSelectedFiltersMessage([]);
              return this.exampleDatabase!.getCompanyListByEurope(
              this.sort.active, this.sort.direction, this.paginator.pageIndex);
            case "north-america":
              this._interactionService.changeSelectedFiltersMessage([]);
              return this.exampleDatabase!.getCompanyListByNorthAmerica(
              this.sort.active, this.sort.direction, this.paginator.pageIndex);
            case "south-america":
              this._interactionService.changeSelectedFiltersMessage([]);
              return this.exampleDatabase!.getCompanyListBySouthAmerica(
              this.sort.active, this.sort.direction, this.paginator.pageIndex);
          }
          // return this.exampleDatabase!.getCompanyList(
          //   this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.count;

          return data.results;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      );
    this._cdr.detectChanges();
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    // this.paginator.pageIndex = 0;
  }

  public openDetailsDialog(companyTicker: string) {
    this._interactionService.changeSymbolMessage(companyTicker);
    this._dialog.open(DetailsDialogComponent);
  }

  // public openFilterDialog() {
  //   const dialogRef = this._dialog.open(FilterDialogComponent, {
  //     width: "900px",
  //     disableClose: true,
  //     data: {
  //       industry: this.industry, 
  //       minMktCap: this.minMktCap,
  //       maxMktCap: this.maxMktCap,
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       console.log("The result: " + result);
  //       this.industry = result.industry;
  //       this.minMktCap = result.minMktCap;
  //       this.maxMktCap = result.maxMktCap;
  //       console.log(this.industry);
  //       console.log(this.minMktCap);
  //       console.log(this.maxMktCap);
  //       console.log("The filter dialog was closed");        
  //     }
  //   });
  // }









  public export_csv() {
    this._activatedRoute.data.subscribe(data => {
      switch(data.kind) {
        case 'all':
          this.exportCompanyData();
          break;
        case 'exchange':
          this.exportCompanyDataAsPerExchange(this._activatedRoute.snapshot.paramMap.get('exchange'));
          break;
        case 'country':
          this.exportCompanyDataAsPerCountry(this._activatedRoute.snapshot.paramMap.get('countryCode'));
          break;
        case 'asia-pacific':
          this.exportCompanyDataAsiaPacific();
          break;
        case 'africa':
          this.exportCompanyDataAfrica();
          break;
        case 'europe':
          this.exportCompanyDataEurope();
          break;
        case 'north-america':
          this.exportCompanyDataNorthAmerica();
          break;
        case 'south-america':
          this.exportCompanyDataSouthAmerica();
          break;
      }
    });
  }

  private exportCompanyData() {
    this._dashboardService
    .exportCompanyList()
    .subscribe(data => {
      saveAs(data, 'all_companies.csv');
    });
  }

  private exportCompanyDataAsPerExchange(exchange: string) {
    this._dashboardService
    .exportCompanyListAsPerExchange(exchange)
    .subscribe(data => {
      saveAs(data, `${exchange}_companies.csv`)
    });
  }

  private exportCompanyDataAsPerCountry(country: string) {
    this._dashboardService
    .exportCompanyListAsPerCountry(country)
    .subscribe(data => {
      saveAs(data, `${country}_companies.csv`)
    });
  }

  private exportCompanyDataAsiaPacific() {
    this._dashboardService
    .exportCompanyListAsiaPacific()
    .subscribe(data => {
      saveAs(data, 'Asia_Pacific_companies.csv')
    });
  }

  private exportCompanyDataAfrica() {
    this._dashboardService
    .exportCompanyListAfrica()
    .subscribe(data => {
      saveAs(data, 'Africa_companies.csv')
    });
  }

  private exportCompanyDataEurope() {
    this._dashboardService
    .exportCompanyListEurope()
    .subscribe(data => {
      saveAs(data, 'Europe_companies.csv')
    });
  }

  private exportCompanyDataNorthAmerica() {
    this._dashboardService
    .exportCompanyListNorthAmerica()
    .subscribe(data => {
      saveAs(data, 'North_America_companies.csv')
    });
  }

  private exportCompanyDataSouthAmerica() {
    this._dashboardService
    .exportCompanyListSouthAmerica()
    .subscribe(data => {
      saveAs(data, 'South_America_companies.csv')
    });
  }

  public mktCapFilter(range: string) {
    alert("hello");
  }

  private formatNumber(n) {
    const ranges = [
      { divider: 1e18 , suffix: 'E' },
      { divider: 1e15 , suffix: 'P' },
      { divider: 1e12 , suffix: 'T' },
      { divider: 1e9 , suffix: 'G' },
      { divider: 1e6 , suffix: 'M' },
      { divider: 1e3 , suffix: 'k' }
    ];
    for (var i = 0; i < ranges.length; i++) {
      if (n >= ranges[i].divider) {
        return (n / ranges[i].divider).toString() + ranges[i].suffix;
      }
    }
    return n.toString();
  }

}



export interface CompanyProfileApi {
  results: CompanyProfile[];
  count: number;
}

export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  // filters:
  public getCompanyListByIndustry(industry: string, sort: string, order: string, page: number) {
    return this._httpClient
    .get<CompanyProfileApi>(`${config.apiUrl}/reporting/companies-full-list/filter/industry/${industry}/?page=${page+1}&sort=${sort}&order=${order}`);
  }

  public getCompanyListByMktCap(mktcapMin: string, mktcapMax: string, sort: string, order: string, page: number) {
    return this._httpClient
    .get<CompanyProfileApi>(`${config.apiUrl}/reporting/companies-full-list/filter/mktcap/${mktcapMin}/${mktcapMax}/?page=${page+1}&sort=${sort}&order=${order}`);
  }

  public getCompanyListByAdtv20(adtv20: string, sort: string, order: string, page: number) {
    return this._httpClient
    .get<CompanyProfileApi>(`${config.apiUrl}/reporting/companies-full-list/filter/adtv20/${adtv20}/?page=${page+1}&sort=${sort}&order=${order}`);
  }

  public getCompanyListFilteredByExchangeAndIndustry(exchange: string, industry: string, sort: string, order: string, page: number) {
    return this._httpClient
    .get<CompanyProfileApi>(`${config.apiUrl}/reporting/companies-full-list/filter/exchange-industry/${exchange}/${industry}/?page=${page+1}&sort=${sort}&order=${order}`);
  }

  public getCompanyListFilteredByExchangeAndMktCap(exchange: string, mktcapMin: string, mktcapMax: string, sort: string, order: string, page: number) {
    return this._httpClient
    .get<CompanyProfileApi>(`${config.apiUrl}/reporting/companies-full-list/filter/exchange-mktcap/${exchange}/${mktcapMin}/${mktcapMax}/?page=${page+1}&sort=${sort}&order=${order}`);
  }

  public getCompanyListFilteredByExchangeAndAdtv20(exchange: string, adtv20: string, sort: string, order: string, page: number) {
    return this._httpClient
    .get<CompanyProfileApi>(`${config.apiUrl}/reporting/companies-full-list/filter/exchange-adtv20/${exchange}/${adtv20}/?page=${page+1}&sort=${sort}&order=${order}`);
  }

  public getCompanyListFilteredByIndustryAndMktCap(industry: string, mktcapMin: string, mktcapMax: string, sort: string, order: string, page: number) {
    return this._httpClient
    .get<CompanyProfileApi>(`${config.apiUrl}/reporting/companies-full-list/filter/industry-mktcap/${industry}/${mktcapMin}/${mktcapMax}/?page=${page+1}&sort=${sort}&order=${order}`);
  }

  public getCompanyListFilteredByIndustryAndAdtv20(industry: string, adtv20: string, sort: string, order: string, page: number) {
    return this._httpClient
    .get<CompanyProfileApi>(`${config.apiUrl}/reporting/companies-full-list/filter/industry-adtv20/${industry}/${adtv20}/?page=${page+1}&sort=${sort}&order=${order}`);
  }

  public getCompanyListFilteredByIndustryAndMktCapAndAdtv20(industry: string, mktcapMin: string, mktcapMax: string, adtv20: string, sort: string, order: string, page: number) {
    return this._httpClient
    .get<CompanyProfileApi>(`${config.apiUrl}/reporting/companies-full-list/filter/industry-mktcap-adtv20/${industry}/${mktcapMin}/${mktcapMax}/${adtv20}/?page=${page+1}&sort=${sort}&order=${order}`);
  }

  public getCompanyListFilteredByExchangeAndIndustryAndMktCap(exchange: string, industry: string, minMktCap: string, maxMktCap: string, sort: string, order: string, page: number) {
    return this._httpClient
    .get<CompanyProfileApi>(`${config.apiUrl}/reporting/companies-full-list/filter/exchange-industry-mktcap/${exchange}/${industry}/${minMktCap}/${maxMktCap}/?page=${page+1}&sort=${sort}&order=${order}`);
  }

  public getCompanyListFilteredByExchangeAndIndustryAndAdtv20(exchange: string, industry: string, adtv20: string, sort: string, order: string, page: number) {
    return this._httpClient
    .get<CompanyProfileApi>(`${config.apiUrl}/reporting/companies-full-list/filter/exchange-industry-adtv20/${exchange}/${industry}/${adtv20}/?page=${page+1}&sort=${sort}&order=${order}`);
  }

  public getCompanyListFilteredByExchangeAndIndustryAndMktCapAndAdtv20(exchange: string, industry: string, minMktCap: string, maxMktCap: string, adtv20: string, sort: string, order: string, page: number) {
    return this._httpClient
    .get<CompanyProfileApi>(`${config.apiUrl}/reporting/companies-full-list/filter/exchange-industry-mktcap-adtv20/${exchange}/${industry}/${minMktCap}/${maxMktCap}/${adtv20}/?page=${page+1}&sort=${sort}&order=${order}`);
  }

  public getCompanyListFilteredByMktCapAndAdtv20(minMktCap: string, maxMktCap: string, adtv20: string, sort: string, order: string, page: number) {
    return this._httpClient
    .get<CompanyProfileApi>(`${config.apiUrl}/reporting/companies-full-list/filter/mktcap-adtv20/${minMktCap}/${maxMktCap}/${adtv20}/?page=${page+1}&sort=${sort}&order=${order}`);
  }

  public getCompanyList(sort: string, order: string, page: number) {
    return this._httpClient
    .get<CompanyProfileApi>(`${config.apiUrl}/reporting/companies-full-list/?page=${page+1}&sort=${sort}&order=${order}`);
  }

  public getCompanyListByExchange(exchange: string, sort: string, order: string, page: number) {
    return this._httpClient
    .get<CompanyProfileApi>(`${config.apiUrl}/reporting/companies-full-list/exchange/${exchange}/?page=${page+1}&sort=${sort}&order=${order}`);
  }



  public getCompanyListByCountry(countryCode: string, sort: string, order: string, page: number) {
    return this._httpClient
    .get<CompanyProfileApi>(`${config.apiUrl}/reporting/companies-full-list/country/${countryCode}/?page=${page+1}&sort=${sort}&order=${order}`);
  }

  public getCompanyListByAsiaPacific(sort: string, order: string, page: number) {
    return this._httpClient
    .get<CompanyProfileApi>(`${config.apiUrl}/reporting/companies-full-list/region/asia-pacific?page=${page+1}&sort=${sort}&order=${order}`);
  }

  public getCompanyListByAfrica(sort: string, order: string, page: number) {
    return this._httpClient
    .get<CompanyProfileApi>(`${config.apiUrl}/reporting/companies-full-list/region/africa?page=${page+1}&sort=${sort}&order=${order}`);
  }

  public getCompanyListByEurope(sort: string, order: string, page: number) {
    return this._httpClient
    .get<CompanyProfileApi>(`${config.apiUrl}/reporting/companies-full-list/region/europe?page=${page+1}&sort=${sort}&order=${order}`);
  }

  public getCompanyListByNorthAmerica(sort: string, order: string, page: number) {
    return this._httpClient
    .get<CompanyProfileApi>(`${config.apiUrl}/reporting/companies-full-list/region/north-america?page=${page+1}&sort=${sort}&order=${order}`);
  }

  public getCompanyListBySouthAmerica(sort: string, order: string, page: number) {
    return this._httpClient
    .get<CompanyProfileApi>(`${config.apiUrl}/reporting/companies-full-list/region/south-america?page=${page+1}&sort=${sort}&order=${order}`);
  }

}

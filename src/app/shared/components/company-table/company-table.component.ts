import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CompanyProfile } from '../../models/companyProfile';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { saveAs } from "file-saver";
// services
import { DashboardService } from '../../services/dashboard.service';
// materials
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { InteractionService } from '../../services/interaction.service';

@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CompanyTableComponent implements OnInit, AfterViewInit {
  @Input('COMPANY_TABLE_DATA') COMPANY_TABLE_DATA!: CompanyProfile[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    "company_ticker", 
    "company_name", 
    "change_percent",
    "market_cap",
    "adtv5",
    "adtv10",
    "industry",
    "exchange",
  ]
  dataSource = new MatTableDataSource<CompanyProfile>(this.COMPANY_TABLE_DATA);
  initialCompanies = [];
  hiddenMktCapBadge = true;
  expandedElement: CompanyProfile | null;
  pageIndex = 0;

  constructor(
    private _dialog: MatDialog,
    private _interactionService: InteractionService,
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    route.params.subscribe(params => {
      this.getCompanyDataAsPerExchange(params['exchange']);
      this.getCompanyDataAsPerCountry(params['countryCode']);
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      switch(data.kind) {
        case 'all': 
          this.getCompanyData();
          break;
        case 'exchange':
          this.getCompanyDataAsPerExchange(this.route.snapshot.paramMap.get('exchange'));
          break;
        case 'country':
          this.getCompanyDataAsPerCountry(this.route.snapshot.paramMap.get('countryCode'));
          break;
        case 'region-asia-pacific':
          this.getCompanyDataAsiaPacific();
          break;
        case 'region-africa':
          this.getCompanyDataAfrica();
          break;
        case 'region-europe':
          this.getCompanyDataEurope();
          break;
        case 'region-north-america':
          this.getCompanyDataNorthAmerica();
          break;
        case 'region-south-america':
          this.getCompanyDataSouthAmerica();
          break;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngDoCheck(): void {
    this.route.queryParamMap.subscribe((paramMap)=>{
      const pageIndex = Number(paramMap.get('page'))
      if(pageIndex){
        this.pageIndex = pageIndex
        this.paginator.pageIndex = pageIndex
      }
    })
  }

  public export_csv() {
    this.route.data.subscribe(data => {
      switch(data.kind){
        case 'all':
          this.exportCompanyData();
          break;
        case 'exchange':
          this.exportCompanyDataAsPerExchange(this.route.snapshot.paramMap.get('exchange'));
          break;
        case 'country':
          this.exportCompanyDataAsPerCountry(this.route.snapshot.paramMap.get('countryCode'));
          break;
        case 'region-asia-pacific':
          this.exportCompanyDataAsiaPacific();
          break;
        case 'region-africa':
          this.exportCompanyDataAfrica();
          break;
        case 'region-europe':
          this.exportCompanyDataEurope();
          break;
        case 'region-north-america':
          this.exportCompanyDataNorthAmerica();
          break;
        case 'region-south-america':
          this.exportCompanyDataSouthAmerica();
          break;
      }
    });
  }

  private getCompanyData() {
    this.dashboardService
    .getCompanyList()
    .subscribe(companies => {
      this.dataSource.data = companies as CompanyProfile[];
      this.initialCompanies = this.dataSource.data;
    });
  }

  private getCompanyDataAsPerExchange(exchange: string) {
    this.dashboardService
    .getCompanyListAsPerExchange(exchange)
    .subscribe(companies => {
      this.dataSource.data = companies as CompanyProfile[];
      this.initialCompanies = this.dataSource.data;
    });
  }

  private getCompanyDataAsPerCountry(country: string) {
    this.dashboardService
    .getCompanyListAsPerCountry(country)
    .subscribe(companies => {
      this.dataSource.data = companies as CompanyProfile[];
      this.initialCompanies = this.dataSource.data;
    });
  }

  private getCompanyDataAsiaPacific() {
    this.dashboardService
    .getCompanyListAsiaPacific()
    .subscribe(companies => {
      this.dataSource.data = companies as CompanyProfile[];
      this.initialCompanies = this.dataSource.data;
    });
  }

  private getCompanyDataAfrica() {
    this.dashboardService
    .getCompanyListAfrica()    
    .subscribe(companies => {
      this.dataSource.data = companies as CompanyProfile[];
      this.initialCompanies = this.dataSource.data;
    });
  }

  private getCompanyDataEurope() {
    this.dashboardService
    .getCompanyListEurope()
    .subscribe(companies => {
      this.dataSource.data = companies as CompanyProfile[];
      this.initialCompanies = this.dataSource.data;
    });
  }

  private getCompanyDataNorthAmerica() {
    this.dashboardService
    .getCompanyListNorthAmerica()
    .subscribe(companies => {
      this.dataSource.data = companies as CompanyProfile[];
      this.initialCompanies = this.dataSource.data;
    });
  }

  private getCompanyDataSouthAmerica() {
    this.dashboardService
    .getCompanyListSouthAmerica()
    .subscribe(companies => {
      this.dataSource.data = companies as CompanyProfile[];
      this.initialCompanies = this.dataSource.data;
    });
  }

  private exportCompanyData() {
    this.dashboardService
    .exportCompanyList()
    .subscribe(data => {
      saveAs(data, 'all_companies.csv');
    });
  }

  private exportCompanyDataAsPerExchange(exchange: string) {
    this.dashboardService
    .exportCompanyListAsPerExchange(exchange)
    .subscribe(data => {
      saveAs(data, `${exchange}_companies.csv`)
    });
  }

  private exportCompanyDataAsPerCountry(country: string) {
    this.dashboardService
    .exportCompanyListAsPerCountry(country)
    .subscribe(data => {
      saveAs(data, `${country}_companies.csv`)
    });
  }

  private exportCompanyDataAsiaPacific() {
    this.dashboardService
    .exportCompanyListAsiaPacific()
    .subscribe(data => {
      saveAs(data, 'Asia_Pacific_companies.csv')
    });
  }

  private exportCompanyDataAfrica() {
    this.dashboardService
    .exportCompanyListAfrica()
    .subscribe(data => {
      saveAs(data, 'Africa_companies.csv')
    });
  }

  private exportCompanyDataEurope() {
    this.dashboardService
    .exportCompanyListEurope()
    .subscribe(data => {
      saveAs(data, 'Europe_companies.csv')
    });
  }

  private exportCompanyDataNorthAmerica() {
    this.dashboardService
    .exportCompanyListNorthAmerica()
    .subscribe(data => {
      saveAs(data, 'North_America_companies.csv')
    });
  }

  private exportCompanyDataSouthAmerica() {
    this.dashboardService
    .exportCompanyListSouthAmerica()
    .subscribe(data => {
      saveAs(data, 'South_America_companies.csv')
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  formatLabel(value: number) {
    if (value >= 1000000) {
      return Math.round(value / 1000000) + 'm';
    }

    return value;
  }

  onPaginateChange(event){
    this.pageIndex = event.pageIndex;
    this.changePageQueryParameter();
  }

  private changePageQueryParameter() {
    const queryParams: Params = { page: this.pageIndex };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams, 
      queryParamsHandling: 'merge',
    });
  }

  public openDetailsDialog(companyTicker: string) {
    this._interactionService.changeSymbolMessage(companyTicker);
    this._dialog.open(DetailsDialogComponent);
  }

  public mktCapFilter(range: string) {
    switch(range) {
      case '>200B':
        console.log("filter mkt cap: " + range);
        this.dataSource.data = this.initialCompanies.filter(data => data.market_cap > 200000000000);
        this.hiddenMktCapBadge = false;
        console.log(this.dataSource.data);
        break;
      case '10B-200B':
        console.log("filter mkt cap: " + range);
        this.dataSource.data = this.initialCompanies.filter(data => data.market_cap > 10000000000 && data.market_cap < 200000000000);
        this.hiddenMktCapBadge = false;
        console.log(this.dataSource.data);
        break;
      case '2B-10B':
        console.log("filter mkt cap: " + range);
        this.dataSource.data = this.initialCompanies.filter(data => data.market_cap > 2000000000 && data.market_cap < 10000000000);
        this.hiddenMktCapBadge = false;
        console.log(this.dataSource.data);
        break;
      case '300M-2B':
        console.log("filter mkt cap: " + range);
        this.dataSource.data = this.initialCompanies.filter(data => data.market_cap > 300000000 && data.market_cap < 2000000000);
        this.hiddenMktCapBadge = false;
        console.log(this.dataSource.data);
        break;
      case '50M-300M':
        console.log("filter mkt cap: " + range);
        this.dataSource.data = this.initialCompanies.filter(data => data.market_cap > 50000000 && data.market_cap < 300000000);
        this.hiddenMktCapBadge = false;
        console.log(this.dataSource.data);
        break;
      case '<50M':
        console.log("filter mkt cap: " + range);
        this.dataSource.data = this.initialCompanies.filter(data => data.market_cap < 50000000);
        this.hiddenMktCapBadge = false;
        console.log(this.dataSource.data);
        break;
      case 'reset':
        console.log("filter mkt cap: " + range);
        this.dataSource.data = this.initialCompanies;
        this.hiddenMktCapBadge = true;
        console.log(this.dataSource.data);
        break;
    }
  }

}

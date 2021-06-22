import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// guards
import { AuthGuard } from './shared/guards/auth.guard';
import { DashboardGuard } from './shared/guards/dashboard.guard';

// components
import { CompanyTableComponent } from './shared/components/company-table/company-table.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { TradingChartComponent } from './shared/components/trading-chart/trading-chart.component';
import { CompanyTradingTableComponent } from './shared/components/company-trading-table/company-trading-table.component';
import { SearchViewComponent } from './shared/components/search-view/search-view.component';
import { SearchViewTabsComponent } from './shared/components/search-view-tabs/search-view-tabs.component';
import { FilterViewComponent } from './shared/components/filter-view/filter-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [DashboardGuard], canLoad: [DashboardGuard],
    children: [
      { path: 'search', component: SearchViewComponent, 
        children: [
          { path: 'symbol/:symbol', component: SearchViewTabsComponent },
        ] 
      },
      { path: 'filter', component: FilterViewComponent,
        children: [
          { path: 'exchange/:exchange',                                                                component: CompanyTradingTableComponent, data: { kind: 'filter-exchange' } },
          { path: 'industry/:industry',                                                                component: CompanyTradingTableComponent, data: { kind: 'filter-industry' } },
          { path: 'mktcap/:mktcapMin/:mktcapMax',                                                      component: CompanyTradingTableComponent, data: { kind: 'filter-mktcap' } },
          { path: 'adtv20/:adtv20',                                                                    component: CompanyTradingTableComponent, data: { kind: 'filter-adtv20' } },

          { path: 'exchange-industry/:exchange/:industry',                                             component: CompanyTradingTableComponent, data: { kind: 'filter-exchange-industry' } },
          { path: 'exchange-mktcap/:exchange/:mktcapMin/:mktcapMax',                                   component: CompanyTradingTableComponent, data: { kind: 'filter-exchange-mktcap' } },
          { path: 'exchange-adtv20/:exchange/:adtv20',                                                 component: CompanyTradingTableComponent, data: { kind: 'filter-exchange-adtv20' } },

          { path: 'industry-mktcap/:industry/:mktcapMin/:mktcapMax',                                   component: CompanyTradingTableComponent, data: { kind: 'filter-industry-mktcap' } },
          { path: 'industry-adtv20/:industry/:adtv20',                                                 component: CompanyTradingTableComponent, data: { kind: 'filter-industry-adtv20' } },
          { path: 'industry-mktcap-adtv20/:industry/:mktcapMin/:mktcapMax/:adtv20',                    component: CompanyTradingTableComponent, data: { kind: 'filter-industry-mktcap-adtv20' } },

          { path: 'exchange-industry-mktcap/:exchange/:industry/:mktcapMin/:mktcapMax',                component: CompanyTradingTableComponent, data: { kind: 'filter-exchange-industry-mktcap' } },
          { path: 'exchange-industry-adtv20/:exchange/:industry/:adtv20',                              component: CompanyTradingTableComponent, data: { kind: 'filter-exchange-industry-adtv20' } },
          { path: 'exchange-industry-mktcap-adtv20/:exchange/:industry/:mktcapMin/:mktcapMax/:adtv20', component: CompanyTradingTableComponent, data: { kind: 'filter-exchange-industry-mktcap-adtv20' } },

          { path: 'mktcap-adtv20/:mktcapMin/:mktcapMax/:adtv20',                                       component: CompanyTradingTableComponent, data: { kind: 'filter-mktcap-adtv20' } },

          // { path: ':exchange/:industry/:minMktCap/:maxMktCap', component: CompanyTradingTableComponent, data: { kind: 'filter-exchange-industry-minMktCap-maxMktCap' } },
          // { path: ':exchange/:industry',                       component: CompanyTradingTableComponent, data: { kind: 'filter-exchange-industry' } },
          // { path: ':exchange',                                 component: CompanyTradingTableComponent, data: { kind: 'filter-exchange'} },
          // { path: ':industry',                                 component: CompanyTradingTableComponent, data: { kind: 'filter-industry'} },
        ]
      },
      { path: 'company',                     component: CompanyTradingTableComponent, data: { kind: 'all' } },
      { path: 'exchange/:exchange',          component: CompanyTradingTableComponent, data: { kind: 'exchange' } },
      { path: 'region/country/:countryCode', component: CompanyTradingTableComponent, data: { kind: 'country' } },

      { path: 'region/asia-pacific',  component: CompanyTradingTableComponent, data: { kind: 'asia-pacific' } },
      { path: 'region/africa',        component: CompanyTradingTableComponent, data: { kind: 'africa' } },
      { path: 'region/europe',        component: CompanyTradingTableComponent, data: { kind: 'europe' } },
      { path: 'region/north-america', component: CompanyTradingTableComponent, data: { kind: 'north-america' } },
      { path: 'region/south-america', component: CompanyTradingTableComponent, data: { kind: 'south-america' } },

      { path: 'trading/:symbol', component: TradingChartComponent },

      { path: 'test',                     component: CompanyTableComponent,        data: { kind: 'all' } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

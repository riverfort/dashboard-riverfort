import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// components
import { LoginComponent } from './shared/components/login/login.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { CompanyTableComponent } from './shared/components/company-table/company-table.component';
import { CompanyTradingTableComponent } from './shared/components/company-trading-table/company-trading-table.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { TradingChartComponent } from './shared/components/trading-chart/trading-chart.component';

// materials
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

// guards
import { AuthGuard } from './shared/guards/auth.guard';
import { DashboardGuard } from './shared/guards/dashboard.guard';

// services
import { AuthService } from './shared/services/auth.service';

// helpers
import { TokenInterceptor } from './shared/helpers/token.interceptor';
  // for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
  // for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// chart
import { NgApexchartsModule } from 'ng-apexcharts';
import { SearchViewComponent } from './shared/components/search-view/search-view.component';
import { SearchViewTabsComponent } from './shared/components/search-view-tabs/search-view-tabs.component';
import { SearchViewTabsSummaryComponent } from './shared/components/search-view-tabs-summary/search-view-tabs-summary.component';
import { AdtvChartComponent } from './shared/components/adtv-chart/adtv-chart.component';
import { AadtvChartComponent } from './shared/components/aadtv-chart/aadtv-chart.component';
import { DetailsDialogComponent } from './shared/components/details-dialog/details-dialog.component';
import { DetailsViewTabsComponent } from './shared/components/details-view-tabs/details-view-tabs.component';
import { CompanyCardComponent } from './shared/components/company-card/company-card.component';
import { FilterDialogComponent } from './shared/components/filter-dialog/filter-dialog.component';

// Other libs:
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MktCapFilterComponent } from './shared/components/mkt-cap-filter/mkt-cap-filter.component';
import { PriceChartComponent } from './shared/components/price-chart/price-chart.component';
import { FilterStepperComponent } from './shared/components/filter-stepper/filter-stepper.component';
import { FilterViewComponent } from './shared/components/filter-view/filter-view.component';
import { FilterChipsComponent } from './shared/components/filter-chips/filter-chips.component';

@NgModule({
  declarations: [
    // components
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CompanyTableComponent,
    CompanyTradingTableComponent,
    RegisterComponent,
    TradingChartComponent,
    SearchViewComponent,
    SearchViewTabsComponent,
    SearchViewTabsSummaryComponent,
    AdtvChartComponent,
    AadtvChartComponent,
    DetailsDialogComponent,
    DetailsViewTabsComponent,
    CompanyCardComponent,
    FilterDialogComponent,
    MktCapFilterComponent,
    PriceChartComponent,
    FilterStepperComponent,
    FilterViewComponent,
    FilterChipsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    // materials
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatMenuModule,
    MatCardModule,
    MatSliderModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatBadgeModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatSelectModule,
    MatChipsModule,
    // for HttpClient use:
    LoadingBarHttpClientModule,
    // for Router use:
    LoadingBarRouterModule,
    // chart
    NgApexchartsModule,
    // other libs:
    NgxSliderModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    DashboardGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

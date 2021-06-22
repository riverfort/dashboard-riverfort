import { Injectable } from '@angular/core';
import { config } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  public getADTV20(symbol: string) {
    return this.http.get<any>(`${config.apiUrl}/reporting/adtv20/${symbol}/`);
  }

  public getCompanyProfile(symbol: string) {
    return this.http.get<any>(`${config.apiUrl}/reporting/profile/${symbol}/`);
  }

  public getCompanyQuote(symbol: string) {
    return this.http.get<any>(`${config.apiUrl}/reporting/quote/${symbol}/`);
  }

  public getCompanyTrading(symbol: string) {
    return this.http.get<any>(`${config.apiUrl}/reporting/trading/${symbol}/`);
  }

  public getCompanyDetail(symbol: string) {
    return this.http.get<any>(`${config.apiUrl}/reporting/company-detail/${symbol}/`);
  }

  public getCompanyList() {
    return this.http.get<any>(`${config.apiUrl}/reporting/companies-all/`);
  }

  public getCompanyListAsPerExchange(exchange: string) {
    return this.http.get<any>(`${config.apiUrl}/reporting/exchange/${exchange}/`);
  }

  public getCompanyListAsiaPacific() {
    return this.http.get<any>(`${config.apiUrl}/reporting/region/asia-pacific`);
  }

  public getCompanyListAfrica() {
    return this.http.get<any>(`${config.apiUrl}/reporting/region/africa`);
  }

  public getCompanyListEurope() {
    return this.http.get<any>(`${config.apiUrl}/reporting/region/europe`);
  }

  public getCompanyListNorthAmerica() {
    return this.http.get<any>(`${config.apiUrl}/reporting/region/north-america`);
  }

  public getCompanyListSouthAmerica() {
    return this.http.get<any>(`${config.apiUrl}/reporting/region/south-america`);
  }

  public getCompanyListAsPerCountry(country: string) {
    return this.http.get<any>(`${config.apiUrl}/reporting/country/${country}/`);
  }

  public exportCompanyList() {
    return this.http.get(`${config.apiUrl}/reporting/companies-all/csv`, { headers: { 'Accept': 'text/csv' }, responseType: 'blob' });
  }
  
  public exportCompanyListAsPerExchange(exchange: string) {
    return this.http.get(`${config.apiUrl}/reporting/exchange/${exchange}/csv`, { headers: { 'Accept': 'text/csv' }, responseType: 'blob' });
  }

  public exportCompanyListAsPerCountry(country: string) {
    return this.http.get(`${config.apiUrl}/reporting/country/${country}/csv`, { headers: { 'Accept': 'text/csv' }, responseType: 'blob' });
  }

  public exportCompanyListAsiaPacific() {
    return this.http.get(`${config.apiUrl}/reporting/region/asia-pacific/csv`, { headers: { 'Accept': 'text/csv' }, responseType: 'blob' });
  }

  public exportCompanyListAfrica() {
    return this.http.get(`${config.apiUrl}/reporting/region/africa/csv`, { headers: { 'Accept': 'text/csv' }, responseType: 'blob' });
  }

  public exportCompanyListEurope() {
    return this.http.get(`${config.apiUrl}/reporting/region/europe/csv`, { headers: { 'Accept': 'text/csv' }, responseType: 'blob' });
  }

  public exportCompanyListNorthAmerica() {
    return this.http.get(`${config.apiUrl}/reporting/region/north-america/csv`, { headers: { 'Accept': 'text/csv' }, responseType: 'blob' });
  }

  public exportCompanyListSouthAmerica() {
    return this.http.get(`${config.apiUrl}/reporting/region/south-america/csv`, { headers: { 'Accept': 'text/csv' }, responseType: 'blob' });
  }

}
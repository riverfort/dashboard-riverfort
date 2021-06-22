import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
// rxjs
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';
import { config } from 'src/app/config';
// model
import { CompanyProfile } from '../../models/companyProfile';

@Injectable({
  providedIn: 'root'
})
export class Service {
  constructor(private http: HttpClient) { }
  opts = [];
  getData() {
    return this.opts.length ?
      of(this.opts) :
      this.http.get<any>(`${config.apiUrl}/reporting/companies-full-list-search/`).pipe(tap(data => this.opts = data))
  }
}

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent {
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(
    private _service: Service
  ) { 
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      switchMap(val => {
        return this.filter(val || '')
      })
    );
  }

  selectedOption(option: CompanyProfile) {
    console.log(option.company_ticker);
  }

  private filter(val: string): Observable<string[]> {
    return this._service.getData()
    .pipe(
      map(response => response.filter(option => {
        return (
          option.company_ticker.toLowerCase().indexOf(val.toLowerCase()) === 0 || 
          option.company_name.toLowerCase().indexOf(val.toLowerCase()) === 0) 
      }))
    )
  }
}

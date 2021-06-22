import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { config } from 'src/app/config';
// rxjs
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Service {
  constructor(private http: HttpClient) { }
  opts = [];
  getData() {
    return this.opts.length ?
      of(this.opts) :
      this.http.get<any>(`${config.apiUrl}/reporting/industries-full-list-search/`).pipe(tap(data => this.opts = data))
  }
}

@Component({
  selector: 'app-filter-stepper',
  templateUrl: './filter-stepper.component.html',
  styleUrls: ['./filter-stepper.component.css']
})
export class FilterStepperComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
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

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
  }

  private filter(val: string): Observable<string[]> {
    return this._service.getData()
    .pipe(
      map(response => response.filter(option => {
        return (
          option.toLowerCase().indexOf(val.toLowerCase()) === 0) 
      }))
    )
  }
}

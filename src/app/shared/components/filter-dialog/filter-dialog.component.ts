import { HttpClient } from '@angular/common/http';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

export interface FilterDialogData {
  exchange: string;
  industry: string;
  minMktCap: string;
  maxMktCap: string;
  adtv20: string;
}

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {
  // stepper group
  exchangeFormGroup: FormGroup;
  industryFormGroup: FormGroup;
  mktCapFormGroup: FormGroup;
  adtv20FormGroup: FormGroup;
  // autocomplete
  filteredIndustryOptions: Observable<string[]>;

  get fExchange() { return this.exchangeFormGroup.controls; }
  get fIndustry() { return this.industryFormGroup.controls; }
  get fMktCap()   { return this.mktCapFormGroup.controls;   }
  get fAdtv20()   { return this.adtv20FormGroup.controls;   }

  constructor(
    private _service: Service,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public filterDialogData: FilterDialogData,
  ) {}

  onCancelClick(): void {
    this._dialogRef.close();
  }

  onSaveClick(): void {
    this._dialogRef.close({
      exchange: this.fExchange.exchangeCtrl.value,
      industry: this.fIndustry.industryCtrl.value,
      minMktCap: this.fMktCap.minMktCapCtrl.value,
      maxMktCap: this.fMktCap.maxMktCapCtrl.value,
      adtv20: this.fAdtv20.adtv20Ctrl.value,
    });
  }

  ngOnInit(): void {
    this.exchangeFormGroup = this._formBuilder.group({
      exchangeCtrl: [this.filterDialogData.exchange, Validators.required]
    });
    this.industryFormGroup = this._formBuilder.group({
      industryCtrl: [this.filterDialogData.industry, Validators.required]
    });
    this.mktCapFormGroup = this._formBuilder.group({
      minMktCapCtrl: [this.filterDialogData.minMktCap, Validators.required],
      maxMktCapCtrl: [this.filterDialogData.maxMktCap, Validators.required],
    });
    this.adtv20FormGroup = this._formBuilder.group({
      adtv20Ctrl: [this.filterDialogData.adtv20, Validators.required],
    });

    this.filteredIndustryOptions = this.fIndustry.industryCtrl.valueChanges
    .pipe(
      startWith(''),
      distinctUntilChanged(),
      switchMap(val => {
        return this._filter(val || '')
      })
    );
  }

  private _filter(val: string): Observable<string[]> {
    return this._service.getData()
    .pipe(
      map(response => response.filter(option => {
        if (option != null && option != "") {
          return (option.toLowerCase().indexOf(val.toLowerCase()) === 0) 
        }
      }))
    );
  }
}

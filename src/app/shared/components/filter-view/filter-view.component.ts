import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InteractionService } from '../../services/interaction.service';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-filter-view',
  templateUrl: './filter-view.component.html',
  styleUrls: ['./filter-view.component.css']
})
export class FilterViewComponent implements OnInit {
  // Selected filters array:
  selectedFilters: string[] = [];
  // Filters dialog values:
  exchange: string;
  industry: string;
  minMktCap: string;
  maxMktCap: string;
  adtv20: string;

  constructor(
    private _dialog: MatDialog,
    private _router: Router,
    private _interactionService: InteractionService,
  ) { }

  ngOnInit(): void {
    this._interactionService.currentSelectedFiltersMessage.subscribe(currentSelectedFiltersMessage => {
      setTimeout(() => { this.selectedFilters = currentSelectedFiltersMessage; }, 0);
    });
  }

  public openFilterDialog() {
    const dialogRef = this._dialog.open(FilterDialogComponent, {
      width: "900px",
      disableClose: true,
      data: {
        exchange: this.exchange,
        industry: this.industry, 
        minMktCap: this.minMktCap,
        maxMktCap: this.maxMktCap,
        adtv20: this.adtv20,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.exchange  = result.exchange;
        this.industry  = result.industry;
        this.minMktCap = result.minMktCap;
        this.maxMktCap = result.maxMktCap;
        this.adtv20    = result.adtv20;
        console.log(this.exchange);
        console.log(this.industry);
        console.log(this.minMktCap);
        console.log(this.maxMktCap);
        console.log(this.adtv20);
        
        if (this.exchange && !this.industry && !this.minMktCap && !this.maxMktCap && !this.adtv20) {
          this.selectedFilters.push(this.exchange);
          this._router.navigate(['dashboard/filter/exchange', this.exchange]);
        }

        if (!this.exchange && this.industry && !this.minMktCap && !this.maxMktCap && !this.adtv20) {
          this.selectedFilters.push(this.industry);
          this._router.navigate(['dashboard/filter/industry', this.industry]);
        }

        if (!this.exchange && !this.industry && this.minMktCap && this.maxMktCap && !this.adtv20) {
          this.selectedFilters.push(this.minMktCap);
          this.selectedFilters.push(this.maxMktCap);
          this._router.navigate(['dashboard/filter/mktcap', this.minMktCap, this.maxMktCap]);
        }

        if (!this.exchange && !this.industry && !this.minMktCap && !this.maxMktCap && this.adtv20) {
          this.selectedFilters.push(this.adtv20);
          this._router.navigate(['dashboard/filter/adtv20', this.adtv20]);
        }

        if (this.exchange && this.industry && !this.minMktCap && !this.maxMktCap && !this.adtv20) {
          this.selectedFilters.push(this.exchange);
          this.selectedFilters.push(this.industry);
          this._router.navigate(['dashboard/filter/exchange-industry', this.exchange, this.industry]);
        }

        if (this.exchange && !this.industry && this.minMktCap && this.maxMktCap && !this.adtv20) {
          this.selectedFilters.push(this.exchange);
          this.selectedFilters.push(this.minMktCap);
          this.selectedFilters.push(this.maxMktCap);
          this._router.navigate(['dashboard/filter/exchange-mktcap', this.exchange, this.minMktCap, this.maxMktCap]);
        }

        if (this.exchange && !this.industry && !this.minMktCap && !this.maxMktCap && this.adtv20) {
          this.selectedFilters.push(this.exchange);
          this.selectedFilters.push(this.industry);
          this._router.navigate(['dashboard/filter/exchange-adtv20', this.exchange, this.adtv20]);
        }

        if (this.exchange && this.industry && this.minMktCap && this.maxMktCap && !this.adtv20) {
          this.selectedFilters.push(this.exchange);
          this.selectedFilters.push(this.industry);
          this.selectedFilters.push(this.minMktCap);
          this.selectedFilters.push(this.maxMktCap);
          this._router.navigate(['dashboard/filter/exchange-industry-mktcap', this.exchange, this.industry, this.minMktCap, this.maxMktCap]);
        }
        
        if (this.exchange && this.industry && !this.minMktCap && !this.maxMktCap && this.adtv20) {
          this.selectedFilters.push(this.exchange);
          this.selectedFilters.push(this.industry);
          this.selectedFilters.push(this.adtv20);
          this._router.navigate(['dashboard/filter/exchange-industry-adtv20', this.exchange, this.industry, this.adtv20]);
        }

        if (this.exchange && this.industry && this.minMktCap && this.maxMktCap && this.adtv20) {
          this.selectedFilters.push(this.exchange);
          this.selectedFilters.push(this.industry);
          this.selectedFilters.push(this.minMktCap);
          this.selectedFilters.push(this.maxMktCap);
          this.selectedFilters.push(this.adtv20);
          this._router.navigate(['dashboard/filter/exchange-industry-mktcap-adtv20', this.exchange, this.industry, this.minMktCap, this.maxMktCap, this.adtv20]);
        }

        if (!this.exchange && this.industry && this.minMktCap && this.maxMktCap && !this.adtv20) {
          this.selectedFilters.push(this.industry);
          this.selectedFilters.push(this.minMktCap);
          this.selectedFilters.push(this.maxMktCap);
          this._router.navigate(['dashboard/filter/industry-mktcap', this.industry, this.minMktCap, this.maxMktCap]);
        }

        if (!this.exchange && this.industry && !this.minMktCap && !this.maxMktCap && this.adtv20) {
          this.selectedFilters.push(this.industry);
          this.selectedFilters.push(this.adtv20);
          this._router.navigate(['dashboard/filter/industry-adtv20', this.industry, this.adtv20]);
        }

        if (!this.exchange && this.industry && this.minMktCap && this.maxMktCap && this.adtv20) {
          this.selectedFilters.push(this.industry);
          this.selectedFilters.push(this.minMktCap);
          this.selectedFilters.push(this.maxMktCap);
          this.selectedFilters.push(this.adtv20);
          this._router.navigate(['dashboard/filter/industry-mktcap-adtv20', this.industry, this.minMktCap, this.maxMktCap, this.adtv20]);
        }

        if (!this.exchange && !this.industry && this.minMktCap && this.maxMktCap && this.adtv20) {
          this.selectedFilters.push(this.industry);
          this.selectedFilters.push(this.minMktCap);
          this.selectedFilters.push(this.maxMktCap);
          this.selectedFilters.push(this.adtv20);
          this._router.navigate(['dashboard/filter/mktcap-adtv20', this.minMktCap, this.maxMktCap, this.adtv20]);
        }





        // if (this.exchange && this.industry) {
        //   console.log("hi");
        //   this.selectedFilters.push(this.exchange);
        //   this.selectedFilters.push(this.industry);
        //   console.log(this.selectedFilters);
        //   this._router.navigate(['dashboard/filter', this.exchange, this.industry]);
        //   if (this.minMktCap && this.maxMktCap) {
        //     this.selectedFilters.push(this.minMktCap);
        //     this.selectedFilters.push(this.maxMktCap);
        //     this._router.navigate(['dashboard/filter', this.exchange, this.industry, this.minMktCap, this.maxMktCap]);
        //   }
        // }
      }
    });
  }
}

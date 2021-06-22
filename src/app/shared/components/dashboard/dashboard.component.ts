import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';
import { DashboardService } from '../../services/dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Filters dialog values:
  exchange: string;
  industry: string;
  minMktCap: number;
  maxMktCap: number;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  symbol: Observable<string>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private _dialog: MatDialog,
    ) { }

  ngOnInit(): void {

  }

  logout() {
    this.authService.logout()
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/login'])
        } else {
          this.router.navigate(['/login'])
        }
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
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("The result: " + result);
        this.exchange = result.exchange;
        this.industry = result.industry;
        this.minMktCap = result.minMktCap;
        this.maxMktCap = result.maxMktCap;
        console.log(this.exchange);
        console.log(this.industry);
        console.log(this.minMktCap);
        console.log(this.maxMktCap);
        console.log("The filter dialog was closed");
        // this.router.navigate([`/dashboard/filter/${this.exchange}/${this.industry}`])     
      }
    });
  }

}

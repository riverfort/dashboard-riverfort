import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-view-tabs',
  templateUrl: './search-view-tabs.component.html',
  styleUrls: ['./search-view-tabs.component.css']
})
export class SearchViewTabsComponent {
  searchedSymbol: string;
  tabLoadTimes: Date[] = [];

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date;
    }
    return this.tabLoadTimes[index];
  }

  constructor(private _activatedRoute: ActivatedRoute) { 
    this._activatedRoute.params.subscribe(params => {
      this.searchedSymbol = params['symbol']
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-view-tabs',
  templateUrl: './details-view-tabs.component.html',
  styleUrls: ['./details-view-tabs.component.css']
})
export class DetailsViewTabsComponent implements OnInit {
  @Input() symbol: string;

  constructor() { }

  ngOnInit(): void {
  }

  tabLoadTimes: Date[] = [];

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date;
    }
    return this.tabLoadTimes[index];
  }

}

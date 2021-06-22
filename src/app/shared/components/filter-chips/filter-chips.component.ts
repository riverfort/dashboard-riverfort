import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filter-chips',
  templateUrl: './filter-chips.component.html',
  styleUrls: ['./filter-chips.component.css']
})
export class FilterChipsComponent {

  @Input() selectedFilters: string[]

  constructor() { }
}

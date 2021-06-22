import { Options } from '@angular-slider/ngx-slider';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mkt-cap-filter',
  templateUrl: './mkt-cap-filter.component.html',
  styleUrls: ['./mkt-cap-filter.component.css']
})
export class MktCapFilterComponent {
  value: number = 10;
  highValue: number = 90;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 10,
    showTicks: true
  };

}

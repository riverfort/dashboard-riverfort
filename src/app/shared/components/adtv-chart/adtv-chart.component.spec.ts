import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdtvChartComponent } from './adtv-chart.component';

describe('AdtvChartComponent', () => {
  let component: AdtvChartComponent;
  let fixture: ComponentFixture<AdtvChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdtvChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdtvChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

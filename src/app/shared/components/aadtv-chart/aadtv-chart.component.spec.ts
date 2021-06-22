import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AadtvChartComponent } from './aadtv-chart.component';

describe('AadtvChartComponent', () => {
  let component: AadtvChartComponent;
  let fixture: ComponentFixture<AadtvChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AadtvChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AadtvChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

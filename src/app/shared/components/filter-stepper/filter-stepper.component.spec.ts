import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterStepperComponent } from './filter-stepper.component';

describe('FilterStepperComponent', () => {
  let component: FilterStepperComponent;
  let fixture: ComponentFixture<FilterStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

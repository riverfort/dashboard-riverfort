import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MktCapFilterComponent } from './mkt-cap-filter.component';

describe('MktCapFilterComponent', () => {
  let component: MktCapFilterComponent;
  let fixture: ComponentFixture<MktCapFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MktCapFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MktCapFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

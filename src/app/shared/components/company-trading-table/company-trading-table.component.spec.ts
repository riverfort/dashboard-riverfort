import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTradingTableComponent } from './company-trading-table.component';

describe('CompanyTradingTableComponent', () => {
  let component: CompanyTradingTableComponent;
  let fixture: ComponentFixture<CompanyTradingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyTradingTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTradingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

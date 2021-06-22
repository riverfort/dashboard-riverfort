import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchViewTabsSummaryComponent } from './search-view-tabs-summary.component';

describe('SearchViewTabsSummaryComponent', () => {
  let component: SearchViewTabsSummaryComponent;
  let fixture: ComponentFixture<SearchViewTabsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchViewTabsSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchViewTabsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

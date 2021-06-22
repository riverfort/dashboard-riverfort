import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchViewTabsComponent } from './search-view-tabs.component';

describe('SearchViewTabsComponent', () => {
  let component: SearchViewTabsComponent;
  let fixture: ComponentFixture<SearchViewTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchViewTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchViewTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

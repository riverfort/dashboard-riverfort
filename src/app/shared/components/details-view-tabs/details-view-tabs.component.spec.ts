import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsViewTabsComponent } from './details-view-tabs.component';

describe('DetailsViewTabsComponent', () => {
  let component: DetailsViewTabsComponent;
  let fixture: ComponentFixture<DetailsViewTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsViewTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsViewTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

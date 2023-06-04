import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAuditsListComponent } from './dashboard-audits-list.component';

describe('DashboardAuditsListComponent', () => {
  let component: DashboardAuditsListComponent;
  let fixture: ComponentFixture<DashboardAuditsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardAuditsListComponent]
    });
    fixture = TestBed.createComponent(DashboardAuditsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

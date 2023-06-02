import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSitesDialogComponent } from './dashboard-sites-dialog.component';

describe('DashboardSitesDialogComponent', () => {
  let component: DashboardSitesDialogComponent;
  let fixture: ComponentFixture<DashboardSitesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardSitesDialogComponent]
    });
    fixture = TestBed.createComponent(DashboardSitesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

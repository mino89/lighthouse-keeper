import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditResultComponent } from './audit-result.component';

describe('AuditResultComponent', () => {
  let component: AuditResultComponent;
  let fixture: ComponentFixture<AuditResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditResultComponent]
    });
    fixture = TestBed.createComponent(AuditResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

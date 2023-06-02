import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSwitchComponent } from './loading-switch.component';

describe('LoadingSwitchComponent', () => {
  let component: LoadingSwitchComponent;
  let fixture: ComponentFixture<LoadingSwitchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingSwitchComponent]
    });
    fixture = TestBed.createComponent(LoadingSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

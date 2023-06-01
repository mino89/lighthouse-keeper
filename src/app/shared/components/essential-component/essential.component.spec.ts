import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssentialComponentComponent } from './essential.component';

describe('EssentialComponentComponent', () => {
  let component: EssentialComponentComponent;
  let fixture: ComponentFixture<EssentialComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EssentialComponentComponent]
    });
    fixture = TestBed.createComponent(EssentialComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PPFCalcComponent } from './ppfcalc.component';

describe('PPFCalcComponent', () => {
  let component: PPFCalcComponent;
  let fixture: ComponentFixture<PPFCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PPFCalcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PPFCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

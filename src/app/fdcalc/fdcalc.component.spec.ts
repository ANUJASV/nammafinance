import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FDCalcComponent } from './fdcalc.component';

describe('FDCalcComponent', () => {
  let component: FDCalcComponent;
  let fixture: ComponentFixture<FDCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FDCalcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FDCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

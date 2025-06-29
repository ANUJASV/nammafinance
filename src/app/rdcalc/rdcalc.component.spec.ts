import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RDCalcComponent } from './rdcalc.component';

describe('RDCalcComponent', () => {
  let component: RDCalcComponent;
  let fixture: ComponentFixture<RDCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RDCalcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RDCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

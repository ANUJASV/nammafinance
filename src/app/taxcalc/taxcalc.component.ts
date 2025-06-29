import { Component,ViewChild  } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import {Router} from '@angular/router';
import {FormControl, FormsModule,ReactiveFormsModule,Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Color, NgxChartsModule, ScaleType} from '@swimlane/ngx-charts';
import { UtilService } from '../shared/util.service';
import {MatButtonModule} from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-taxcalc',
  imports: [MatIconModule,MatCardModule,FormsModule,ReactiveFormsModule,CommonModule,NgxChartsModule, MatTabsModule, MatButtonModule,
    MatTooltipModule,MatTabGroup
  ],
  templateUrl: './taxcalc.component.html',
  styleUrls: ['./taxcalc.component.css','../../global-style.css']
})
export class TaxcalcComponent {

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  constructor(private router:Router, public utilservice:UtilService){

  }

  ageCategory = new FormControl('Below 60');
  incomeFromSalary = new FormControl('',[Validators.required]);
  incomeFromInterest = new FormControl('');
  rentalIncome = new FormControl('');
  digitalAssetsIncome = new FormControl('');
  exemptAllowances = new FormControl('');
  selfOccupiedIncome = new FormControl('');
  letOutIncome = new FormControl('');
  otherIncome = new FormControl('');
  ded80C = new FormControl(''); 
  ded80D = new FormControl('');
  ded80EEA = new FormControl('');
  ded80CCD = new FormControl('');
  ded80CCD2 = new FormControl('');
  ded80TTA = new FormControl('');
  ded80G = new FormControl('');
  otherdeductions = new FormControl('');

  totalIncome = (Number(this.incomeFromSalary.value)+Number(this.incomeFromInterest.value)+Number(this.rentalIncome.value)+Number(this.digitalAssetsIncome.value)+Number(this.exemptAllowances.value)+Number(this.otherIncome.value)) - (Number(this.selfOccupiedIncome.value)+Number(this.letOutIncome.value))
  deductions = Number(this.ded80C.value)+Number(this.ded80D.value)+Number(this.ded80EEA.value)+Number(this.ded80CCD.value)+Number(this.ded80CCD2.value)+Number(this.ded80TTA.value)+Number(this.ded80G.value)+Number(this.otherdeductions.value)
  taxableIncome=this.totalIncome-this.deductions;

  goToNextTab(): void {
    const currentIndex = this.tabGroup.selectedIndex ?? 0;
    const nextIndex = currentIndex + 1;
    if (nextIndex < this.tabGroup._tabs.length) {
      this.tabGroup.selectedIndex = nextIndex;
    }
  }

  calculateOldTax(){
    var excemptionLimit=250000;
    var taxAmount=0;

    switch(this.ageCategory.value){
      case 'Below 60':
        excemptionLimit=250000;
        break;
      case '60 to 80':
        excemptionLimit=300000;
        break;
      case '80 & above':
        excemptionLimit=500000;
        break;
    }
    if(this.taxableIncome>excemptionLimit && this.taxableIncome<500000){
      taxAmount = (this.taxableIncome-excemptionLimit)*0.05;
    }
    else if(this.taxableIncome>500000 && this.taxableIncome>100000){
      
    }
  }

}

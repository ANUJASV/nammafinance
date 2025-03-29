import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {Router} from '@angular/router';
import {FormControl, FormsModule,ReactiveFormsModule,Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Color, NgxChartsModule, ScaleType} from '@swimlane/ngx-charts';
import { UtilService } from '../shared/util.service';

@Component({
  selector: 'app-taxcalc',
  imports: [MatIconModule,MatCardModule,FormsModule,ReactiveFormsModule,CommonModule,NgxChartsModule],
  templateUrl: './taxcalc.component.html',
  styleUrls: ['./taxcalc.component.css','../../global-style.css']
})
export class TaxcalcComponent {

  constructor(private router:Router, public utilservice:UtilService){
    this.calculateTax();
  }

  financialYr = new FormControl('');
  age=new FormControl('');
  salary=new FormControl('');
  interest=new FormControl('');
  rentalincome=new FormControl('');
  digitalassetincome = new FormControl('');
  allowances = new FormControl('');
  homeLoanselfocc = new FormControl('');
  homeLoanLetOut = new FormControl('');
  otherIncome = new FormControl('');
  lifeinsurance = new FormControl('');
  ppf = new FormControl('');
  Contributiontoppf = new FormControl('');
  FD = new FormControl('');
  repaymenthousingloan = new FormControl('');
  ULIP = new FormControl('');
  ELSS = new FormControl('');
  NPS = new FormControl('');
  tutionfee = new FormControl('');
  otherinv = new FormControl('');
  selfndfam=new FormControl('');
  prevcheckup=new FormControl('');
  parentblw60=new FormControl('');
  parentabv60=new FormControl('');
  hra = new FormControl('');
  housingloaninterest = new FormControl('');
  NPS80ccd = new FormControl('');
  depositint80tta = new FormControl('');
  donation80g = new FormControl('');
  nps80ccd = new FormControl('');
  otherded = new FormControl('');

  isexpanded :boolean=false;
  under80c :boolean = false;
  under80d :boolean=false;
  ded :boolean=false;

  grossIncome:number=0;
  oldTaxPayable:number=0;
  newTaxPayable:number=0;
  result:any;

  toggleincomedetails(){
    this.isexpanded=!this.isexpanded;
  }
  toggle80c(){
    this.under80c=!this.under80c;
  }
  toggle80d(){
    this.under80d=!this.under80d;
  }
  togglededuc(){
    this.ded=!this.ded;
  }

  calculateTax(){
    console.log('calculating tax');
    
    this.grossIncome =
      Number(this.salary.value ?? 0) +
      Number(this.interest.value ?? 0) +
      Number(this.rentalincome.value ?? 0) +
      Number(this.digitalassetincome.value ?? 0) +
      Number(this.otherIncome.value ?? 0) -
      Number(this.allowances.value ?? 0);

    console.log('gross income after sum', this.grossIncome);

    let netRentalIncome = Number(this.rentalincome.value ?? 0) - Number(this.homeLoanLetOut.value ?? 0);
    this.grossIncome += netRentalIncome;

    let deductionUnder80C = Math.min(150000,
      Number(this.lifeinsurance.value ?? 0) +
      Number(this.ppf.value ?? 0) +
      Number(this.Contributiontoppf.value ?? 0) +
      Number(this.FD.value ?? 0) +
      Number(this.repaymenthousingloan.value ?? 0) +
      Number(this.ULIP.value ?? 0) +
      Number(this.ELSS.value ?? 0) +
      Number(this.NPS.value ?? 0) +
      Number(this.tutionfee.value ?? 0) +
      Number(this.otherinv.value ?? 0)
    );

    let deductionUnder80D =
      Number(this.selfndfam.value ?? 0) +
      Number(this.prevcheckup.value ?? 0) +
      Number(this.parentblw60.value ?? 0) +
      Number(this.parentabv60.value ?? 0);

    let otherdeductions =
      Number(this.hra.value ?? 0) +
      Number(this.housingloaninterest.value ?? 0) +
      Number(this.NPS80ccd.value ?? 0) +
      Number(this.depositint80tta.value ?? 0) +
      Number(this.donation80g.value ?? 0) +
      Number(this.nps80ccd.value ?? 0) +
      Number(this.otherded.value ?? 0);

    let taxableIncome = this.grossIncome - (deductionUnder80C + deductionUnder80D + otherdeductions);

    this.oldTaxPayable = this.applyOldTaxSlab(taxableIncome, this.age.value);
    this.newTaxPayable = this.applyNewTaxSlab(this.grossIncome, this.age.value);

    this.result = [
      { "name": "Gross Income", "value": this.grossIncome },
      { "name": "Tax to be paid", "value": this.oldTaxPayable }
    ];

    console.log('gross income', this.grossIncome);
}

  /* old tax regime */
  applyOldTaxSlab(income:number,age:string|null){
    let tax=0;
    if(age==='below60'){
      if(income<=250000){
        tax=0;
      }
      else if(income>250000 && income<=500000){
        tax = (income-250000)*0.05;
      }
      else if(income>500000 && income<=1000000){
        tax = (income-500000)*0.2;
      }
      else{
        tax = (income-1000000)*0.3;
      }
    }
    else if(age==='60to80'){
      if(income<=300000){
        tax=0;
      }
      else if(income>300000 && income<=500000){
        tax = (income-300000)*0.05;
      }
      else if(income>500000 && income<=1000000){
        tax = (income-500000)*0.2;
      }
      else{
        tax = (income-1000000)*0.3;
      }
    }
    else{
      if(income<=500000){
        tax=0;
      }
      else if(income>500000 && income<=1000000){
        tax = (income-500000)*0.2;
      }
      else{
        tax = (income-1000000)*0.3;
      }
    }

    return tax +(tax*0.04);
  }

  /* New tax regime */
  applyNewTaxSlab(income:number, age:string|null){
    let tax=0;    
    if(income<=300000){
      tax=0;
    }
    else if(income>300000 && income<=600000){
      tax = (income-300000)*0.05;
    }
    else if (income>600000 && income<=900000){
      tax = (income-600000)*0.1;
    }
    else if(income>900000 && income<=1200000){
      tax = (income-900000)*0.15;
    }
    else if(income>1200000 && income<=1500000){
      tax = (income-1200000)*0.2;
    }
    else{
      tax = (income-1500000)*0.3;
    }
    return tax +(tax*0.04);
  }
}

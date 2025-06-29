import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {FormControl,FormGroup, FormsModule,ReactiveFormsModule,Validators} from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { UtilService } from '../shared/util.service';

@Component({
  selector: 'app-rdcalc',
  imports: [MatCardModule, MatButtonModule,MatSliderModule,MatIconModule,MatTableModule, FormsModule,ReactiveFormsModule,NgxChartsModule],
  templateUrl: './rdcalc.component.html',
  styleUrls: ['./rdcalc.component.css' ,'../../global-style.css']
})
export class RDCalcComponent {

  monthlyInvestment = new FormControl(2000, [Validators.required,Validators.min(100),Validators.max(1000000)]);
  rateOfInterest=new FormControl(7, [Validators.required,Validators.min(1),Validators.max(15)]);
  investmentPeriod = new FormControl(5,[Validators.required, Validators.min(1), Validators.max(10)]);
  maturityValue=0;
  returns=0;
  result:any;
  linechartresult:any;
  RDTable: any[] = [];
  xAxisLabel = 'Years';

  constructor(private router:Router, public utilservice:UtilService){
      this.CalculateRD();
    }

  CalculateRD(){
    let principalamt=Number(this.monthlyInvestment.value)
    let interestRate=Number(this.rateOfInterest.value)
    let timePeriod=Number(this.investmentPeriod.value)
    let quartersvalue = timePeriod*4;
    let base=1+(interestRate/400);
    this.maturityValue = Math.round((principalamt*(Math.pow(base,quartersvalue)-1))/(1-Math.pow(base,-1/3)))
    this.returns=this.maturityValue-(principalamt*timePeriod*12);
    this.result = [
      {
        "name": "Total Investment",
        "value": principalamt*timePeriod*12
      },
      {
        "name": "Total Returns",
        "value": this.returns
      }
    ];
    this.calculateYearlyData(principalamt,timePeriod,base)
  }

  calculateYearlyData(principalamt:number,years:number,base:number){
    let amount=0;
    let openingBalance=0;
    let interestEarned=0;
    let yearlyChartData = [];
    let updatedTable = []; 

    for(let year=1;year<=years;year++){
      amount=Math.round(principalamt*(Math.pow(base,year*4)-1)/(1-Math.pow(base,-1/3)));
      interestEarned = amount - (principalamt*year*12);
      yearlyChartData.push({
        "name": year.toString(),
        "value": Math.round(amount)
      });
      updatedTable.push({
        Year:year,
        OpeningBalance:openingBalance,
        InvestedAmount:principalamt*12,
        InterestEarned:interestEarned,
        MaturityAmount:amount
      });
      openingBalance=amount;
    }
    this.RDTable = updatedTable; 
    this.linechartresult = [
      {
          "name": "Maturity Amount",
          "series": yearlyChartData
      }];
  }
  
  toggleForm= new FormGroup({
    chartToggle:new FormControl(false)
  });

  get isChecked(){
    return this.toggleForm.get('chartToggle')?.value;
  }

  toggleChart(){
    this.toggleForm.get('chartToggle')?.setValue(!this.isChecked);
  }

}

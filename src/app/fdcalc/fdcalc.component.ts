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
  selector: 'app-fdcalc',
  imports: [MatCardModule,MatButtonModule, MatSliderModule,MatIconModule,MatTableModule,FormsModule,ReactiveFormsModule, NgxChartsModule],
  templateUrl: './fdcalc.component.html',
  styleUrls: ['./fdcalc.component.css','../../global-style.css']
})
export class FDCalcComponent {

  totalInvestment = new FormControl(100000, [Validators.required,Validators.min(1000),Validators.max(10000000)]);
  rateOfInterest=new FormControl(7, [Validators.required,Validators.min(1),Validators.max(15)]);
  investmentPeriod = new FormControl(10,[Validators.required, Validators.min(1), Validators.max(25)]);

  result:any;
  linechartresult:any;
  FDTable: any[] = [];
  maturityValue=0;
  returns=0;
  xAxisLabel = 'Years';

  constructor(private router:Router, public utilservice:UtilService){
    this.calculateFD();
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

  calculateFD(){
    let principalamt=Number(this.totalInvestment.value);
    let interestRate = Number(this.rateOfInterest.value)/100;
    let timePeriod=Number(this.investmentPeriod.value);
    this.maturityValue = Math.round(principalamt * Math.pow(1+interestRate,timePeriod));
    this.returns = this.maturityValue-principalamt;
    this.result = [
      {
        "name": "Total Investment",
        "value": principalamt
      },
      {
        "name": "Total Returns",
        "value": this.returns
      }
    ];
    this.calculateYearlyData(principalamt,interestRate,timePeriod)
  }

  calculateYearlyData(principalamt:number,interestRate:number,totalyrs:number){
    let Amount=0;
    let openingBalance=principalamt;
    let interestEarned=0;
    let yearlyChartData = [];
    let updatedTable = []; 

    for(let year=1;year<=totalyrs;year++){
      Amount= Math.round(principalamt * Math.pow(1+interestRate,year));
      interestEarned = Amount - openingBalance;
      yearlyChartData.push({
        "name": year.toString(),
        "value": Math.round(Amount)
      });
      
      updatedTable.push({
        Year:year,
        OpeningBalance:openingBalance,
        InterestEarned:interestEarned,
        MaturityAmount:Amount
      });
      openingBalance=Amount;
    }
    this.FDTable = updatedTable; 
    this.linechartresult = [
      {
          "name": "Maturity Amount",
          "series": yearlyChartData
      }];
  }
}

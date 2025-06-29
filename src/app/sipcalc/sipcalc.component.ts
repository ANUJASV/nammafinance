import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { UtilService } from '../shared/util.service';
import {MatCardModule} from '@angular/material/card';
import{FormControl,FormGroup,ReactiveFormsModule, Validators,} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-sipcalc',
  imports: [MatIconModule, MatCardModule,ReactiveFormsModule,MatSliderModule,MatButtonModule,CommonModule,NgxChartsModule,MatTableModule],
  templateUrl: './sipcalc.component.html',
  styleUrls: ['./sipcalc.component.css','../../global-style.css']
})
export class SipcalcComponent {
  constructor(public utilservice:UtilService){
    this.calcinvesment();
  }

  monthlyinvestment = new FormControl(10000, [Validators.required,Validators.min(100),Validators.max(1000000)]);
  investmentperiod = new FormControl(10,[Validators.required,Validators.min(1),Validators.max(40)]);
  returnrate = new FormControl(12, [Validators.required,Validators.min(1),Validators.max(30)]);

  maturityAmount:number=0;
  investedAmount:number=0
  returnestimated:number=0;
  result:any;
  linechartresult:any;
  siptable: any[] = [];

  toggleForm= new FormGroup({
    chartToggle:new FormControl(false)
  });

  get isChecked(){
    return this.toggleForm.get('chartToggle')?.value;
  }

  toggleChart(){
    this.toggleForm.get('chartToggle')?.setValue(!this.isChecked);
  }

  calcinvesment(){
    let monthlyreturn = (Number(this.returnrate.value)/12)/100;
    let noOfmonths = Number(this.investmentperiod.value)*12;
    this.maturityAmount= Math.round(Number(this.monthlyinvestment.value)* ((Math.pow(1+monthlyreturn,noOfmonths)-1)/monthlyreturn)*(1+monthlyreturn));
    this.investedAmount=Number(this.monthlyinvestment.value)*noOfmonths;
    this.returnestimated = this.maturityAmount-this.investedAmount;

    this.result = [
      {
        "name": "Invested Amount",
        "value": this.investedAmount
      },
      {
        "name": "Interest Earned",
        "value": this.returnestimated
      }
    ];
    this.calculateYearlyData(Number(this.monthlyinvestment.value),monthlyreturn)
  }
  calculateYearlyData(principalamt:number,returnrate:number){
    let openingbalance=0;
    let investedamount=0;
    let interestEarned=0;
    let maturityamt=0;
    const updatedTable = []; 
    const yearlyChartData = [];

    for(let year=1;year<=Number(this.investmentperiod.value);year++){
      investedamount=principalamt* (year*12);
      maturityamt=principalamt *((Math.pow(1+returnrate,year*12)-1)/returnrate)*(1+returnrate);
      interestEarned=maturityamt-investedamount;
      updatedTable.push({
        year:year,
        openingbalance:openingbalance,
        investedamount:investedamount,
        interestEarned:Math.round(interestEarned),
        maturityamt:Math.round(maturityamt)
      });
      openingbalance=maturityamt;
      yearlyChartData.push({
        "name": year.toString(),
        "value": Math.round(maturityamt)
      });
    }
    this.siptable = updatedTable; 
    this.linechartresult = [
      {
          "name": "PPF Growth",
          "series": yearlyChartData
      }];
  }
}



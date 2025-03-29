import { Component} from '@angular/core';
import { Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import{FormControl,FormGroup,ReactiveFormsModule, Validators,} from '@angular/forms';
import { UtilService } from '../shared/util.service';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-ppfcalc',
  imports: [MatIconModule,MatCardModule,NgxChartsModule,ReactiveFormsModule,MatInputModule,MatTableModule,MatTooltipModule,
    MatFormFieldModule,MatSliderModule,MatButtonModule],
  templateUrl: './ppfcalc.component.html',
  styleUrls: ['./ppfcalc.component.css', '../../global-style.css']
})

export class PPFCalcComponent {
  
  yearlyInvestment = new FormControl(150000, [Validators.required,Validators.min(500),Validators.max(150000)]);
  investmentPeriod = new FormControl(15,[Validators.required, Validators.min(15), Validators.max(50)]);
  rateOfInterest=new FormControl(7.1);

  maturityValue:number = 0;
  investedAmount:number=0;
  interestEarned:number=0;
  result:any;
  linechartresult:any;
  ppfTable: any[] = [];

  constructor(private router:Router, public utilservice:UtilService){
    this.calcinvesment();
  }

  calcinvesment(){
    const principalamt=Number(this.yearlyInvestment.value);
    const rateOfinterestperannum=Number((this.rateOfInterest.value))/100;
    const investmentPeriod=Number(this.investmentPeriod.value);

    this.maturityValue= Math.round(principalamt * (((Math.pow(1+rateOfinterestperannum,investmentPeriod))-1)/rateOfinterestperannum) * (1+rateOfinterestperannum));
    this.investedAmount=Math.round(principalamt*investmentPeriod);
    this.interestEarned=Math.round(this.maturityValue-this.investedAmount);

    this.result = [
      {
        "name": "Invested Amount",
        "value": this.investedAmount
      },
      {
        "name": "Interest Earned",
        "value": this.interestEarned
      }
    ];

    this.calculateYearlydata(principalamt,rateOfinterestperannum,investmentPeriod);
  }

  calculateYearlydata(principalamt:number,rateOfinterestperannum:number,investmentPeriod:number){

    let openingbalance=0;
    let totalIntEarned=0;
    let balance=0;
    const updatedTable = []; 
    const yearlyChartData = [];

    for(let year=1; year<=investmentPeriod; year++){
      openingbalance = balance;
      totalIntEarned=(balance+principalamt)*rateOfinterestperannum;
      balance= balance+principalamt+totalIntEarned;
     
      updatedTable.push({
        year:year,
        OpeningBalance:Math.round(openingbalance),
        InvestedAmount:principalamt,
        InterestEarned:Math.round(totalIntEarned),
        MaturityAmount:Math.round(balance)
      });
      yearlyChartData.push({
        "name": year.toString(),
        "value": Math.round(balance)
      });
    }   

    this.ppfTable = updatedTable; 
    this.linechartresult = [
      {
          "name": "PPF Growth",
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

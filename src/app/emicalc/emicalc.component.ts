import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {Router} from '@angular/router';
import {FormControl,FormGroup, FormsModule,ReactiveFormsModule,Validators} from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { UtilService } from '../shared/util.service';
import {MatTableModule} from '@angular/material/table';
import {MatSliderModule} from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-emicalc',
  imports: [MatIconModule,MatCardModule,FormsModule,ReactiveFormsModule,NgxChartsModule,MatTableModule,MatSliderModule,MatRadioModule,
    MatButtonModule, MatExpansionModule
  ],
  templateUrl: './emicalc.component.html',
  styleUrls: ['./emicalc.component.css','../../global-style.css']
})
export class EmicalcComponent {
  loanAmount = new FormControl(100000,[Validators.required,Validators.min(1000),Validators.max(10000000)]);
  interestRate = new FormControl(10,[Validators.required,Validators.min(1),Validators.max(50)]);
  tenureType = new FormControl('Yr');
  tenure = new FormControl(12,[Validators.required,Validators.min(1),Validators.max(50)]);
  
  minValue = 1;
  maxValue = 50;
  stepValue = 1;
  emi:number=0;
  totalInterest:number=0;
  repaymentAmt:number=0;
  result:any;
  loanAmt:number=0;
  emiTable: any[] = [];
  expandedYear: number | null = null;
  linechartresult:any;
  xAxisLabel = 'Years';

  toggleForm= new FormGroup({
    chartToggle:new FormControl(false)
  });

  constructor(private router:Router, public utilservice:UtilService){
    this.tenureType.valueChanges.subscribe((value) => {
      this.updateSliderValues(value);
    });
    this.calcFlatRate();
  }

  get isChecked(){
    return this.toggleForm.get('chartToggle')?.value;
  }

  toggleChart(){
    this.toggleForm.get('chartToggle')?.setValue(!this.isChecked);
  }

  toggleExpand(year: number): void {
    this.expandedYear = this.expandedYear === year ? null : year;
  }

  updateSliderValues(type: string | null) {
    if (type === 'Yr') {
      this.minValue = 1;
      this.maxValue = 50;
      this.stepValue = 1;
      this.tenure.setValue(12);
      this.tenure.setValidators([Validators.required, Validators.min(1), Validators.max(50)]);
    } else {
      this.minValue = 1;
      this.maxValue = 600;
      this.stepValue = 1;
      this.tenure.setValue(5);
      this.tenure.setValidators([Validators.required, Validators.min(1), Validators.max(600)]);
    }
  }

  calcFlatRate(){
    let tenureValue=this.tenureType.value ==='M'?Number(this.tenure.value)/12:Number(this.tenure.value);
    this.loanAmt=Number(this.loanAmount.value);
    this.totalInterest=Math.round((this.loanAmt*Number(this.interestRate.value)*tenureValue)/100);
    this.repaymentAmt=Math.round(this.loanAmt+this.totalInterest);
    this.emi=Math.round (this.repaymentAmt/(tenureValue*12));
    this.result = [
      {
        "name": "Loan Amount",
        "value": this.loanAmt
      },
      {
        "name": "Interest to be paid",
        "value": this.totalInterest
      }
    ];
    this.calculateEMIData(this.loanAmt,this.totalInterest,this.repaymentAmt)
  }

  calculateEMIData(loanAmt:number,rateofInt:number,repaymentamt:number){

    let principalamtpermonth=loanAmt/Number(this.tenure.value);
    let interestpermonth=rateofInt/Number(this.tenure.value);
    let totalpay=principalamtpermonth+interestpermonth;
    let balance=repaymentamt;
    const updatedTable = []; 
    const yearlyChartData = [];
    
    if (this.tenureType.value==='Yr' || (this.tenureType.value==='M' && Number(this.tenure.value)>=12))
    {
      for(let year=1;year<=Number(this.tenure.value);year++){
        balance=balance-totalpay;
        updatedTable.push({
          year:year,
          principal:Math.round(principalamtpermonth),
          interest:Math.round(interestpermonth),
          totalpayment:Math.round(totalpay),
          balance:Math.round(balance),
          monthdata:this.calculateMonthlydata(principalamtpermonth,interestpermonth,totalpay,12)
        });
        yearlyChartData.push({
          "name": year.toString(),
          "value": Math.round(balance)
        });
      }
    }  
    else{
      this.xAxisLabel = 'Months';
        balance=balance-totalpay;
        updatedTable.push({
          year:0,
          principal:Math.round(principalamtpermonth),
          interest:Math.round(interestpermonth),
          totalpayment:Math.round(totalpay),
          balance:Math.round(balance),
          monthdata:this.calculateMonthlydata(principalamtpermonth,interestpermonth,totalpay,Number(this.tenure.value))
        });
        let remainingBalance = repaymentamt;
        for (let i = 1; i <= Number(this.tenure.value); i++) {
          remainingBalance -= totalpay;
          yearlyChartData.push({
            name: `${i}`,
            value: Math.round(remainingBalance)
          });
        }
      }  
      this.emiTable=updatedTable; 
      this.linechartresult = [
        {
          "name": "balance",
          "series": yearlyChartData
        }];
  }

  calculateMonthlydata(principalamt:number,interest:number,totalpay:number,duration:number){
    const monthlydata=[];
    for(let month=1;month<=duration;month++){
      monthlydata.push({
        month:month,
        principalamtpermonth:Math.round(principalamt/12),
        interestpermonth:Math.round(interest/12),
        totalpay:Math.round(totalpay/12),
      });
    }
    return monthlydata;
  }
}

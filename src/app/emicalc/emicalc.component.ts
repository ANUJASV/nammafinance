import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {Router} from '@angular/router';
import {FormControl, FormsModule,ReactiveFormsModule,Validators} from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { UtilService } from '../shared/util.service';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-emicalc',
  imports: [MatIconModule,MatCardModule,FormsModule,ReactiveFormsModule,NgxChartsModule,MatTableModule],
  templateUrl: './emicalc.component.html',
  styleUrls: ['./emicalc.component.css','../../global-style.css']
})
export class EmicalcComponent {
  loanAmount = new FormControl('',[Validators.required]);
  interestRate = new FormControl('',[Validators.required]);
  tenure = new FormControl('',[Validators.required]);
  
  emi:number=0;
  totalInterest:number=0;
  repaymentAmt:number=0;
  result:any;
  loanAmt:number=0;

  ismonth:boolean=true;
  emiTable: any[] = [];

  constructor(private router:Router, public utilservice:UtilService){}

  calcFlatRate(){
    let tenureInMnths=0;
    if(!this.ismonth){
      tenureInMnths=Number(this.tenure.value)*12;
    }
    else{
      tenureInMnths=Number(this.tenure.value);
    }
    this.loanAmt=Number(this.loanAmount.value);
    this.totalInterest=Math.round((Number(this.loanAmt)*Number(this.interestRate.value)*Number(tenureInMnths))/100);
    this.repaymentAmt=Math.round(Number(this.loanAmt)+this.totalInterest);
    this.emi=Math.round (this.repaymentAmt/Number(tenureInMnths));
    this.result = [
      {
        "name": "Loan Amount",
        "value": Number(this.loanAmount.value)
      },
      {
        "name": "Interest to be paid",
        "value": this.totalInterest
      }
    ];
    this.calculateMonthlyData(this.loanAmt,this.totalInterest,tenureInMnths,this.repaymentAmt)
  }

  calculateMonthlyData(loanAmt:number,rateofInt:number,mothlytenure:number,repaymentamt:number){
    let principalamtpermonth=0;
    let interestpermonth=0;
    let totalpay=0;
    let balance=repaymentamt;
    const updatedTable = []; 

    for(let month=1;month<=mothlytenure;month++){
      principalamtpermonth=loanAmt/mothlytenure;
      interestpermonth=rateofInt/mothlytenure;
      totalpay=principalamtpermonth+interestpermonth;
      balance=balance-totalpay;

      updatedTable.push({
        month:month,
        principal:Math.round(principalamtpermonth),
        interest:Math.round(interestpermonth),
        totalpayment:Math.round(totalpay),
        balance:Math.round(balance)
      });
    }
    this.emiTable=updatedTable;
  }

  toggleTenure(){
    this.ismonth=!this.ismonth;
  }

}

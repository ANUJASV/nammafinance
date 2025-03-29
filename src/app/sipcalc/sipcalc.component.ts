import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { UtilService } from '../shared/util.service';
import {MatCardModule} from '@angular/material/card';
import {FormControl,ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-sipcalc',
  imports: [MatIconModule, MatCardModule,ReactiveFormsModule],
  templateUrl: './sipcalc.component.html',
  styleUrls: ['./sipcalc.component.css','../../global-style.css']
})
export class SipcalcComponent {
  constructor(public utilservice:UtilService){}

  monthlyinvestment = new FormControl('', Validators.required);
  returnrate = new FormControl('', Validators.required);
  investmentperiod = new FormControl('', Validators.required);

  maturityAmount:number=0;
  investedAmount:number=0
  returnestimated:number=0;

  calcinvesment(){
    let monthlyreturn = (Number(this.returnrate.value)/12)/100;
    let noOfmonths = Number(this.investmentperiod.value)*12;
    this.maturityAmount= Math.round(Number(this.monthlyinvestment.value)* ((Math.pow(1+monthlyreturn,noOfmonths)-1)/monthlyreturn)*(1+monthlyreturn));
    this.investedAmount=Number(this.monthlyinvestment.value)*noOfmonths;
    this.returnestimated = this.maturityAmount-this.investedAmount;

  }
}

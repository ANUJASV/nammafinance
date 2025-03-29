import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PPFCalcComponent } from './ppfcalc/ppfcalc.component';
import { EmicalcComponent } from './emicalc/emicalc.component';
import { SipcalcComponent } from './sipcalc/sipcalc.component';
import { TaxcalcComponent } from './taxcalc/taxcalc.component';

export const routes: Routes = [
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'home', component:HomeComponent},
    {path:'ppfcalculator', component:PPFCalcComponent},
    {path:'emicalculator',component:EmicalcComponent},
    {path:'sipcalculator',component:SipcalcComponent},
    {path:'taxcalculator',component:TaxcalcComponent},
    {path:'**',component:HomeComponent}
];

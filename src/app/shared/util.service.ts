import { Injectable, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ScaleType, Color } from '@swimlane/ngx-charts';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root' // Makes it available application-wide
})
export class UtilService {
  view: [number, number] = [300, 200];
  areachartview:[number,number]=[300,200];

  colorScheme = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain:['#043873', '#a29ba1']
  };

    customColorScheme: Color = {
      name: 'customScheme',
      selectable: true,
      group: ScaleType.Ordinal,
      domain: [
        '#043873',  // Base color
        '#0A4C99',  // Slightly lighter
        '#062D5B',  // Slightly darker
        '#0850A1',  // Brighter blue
        '#021E3A'   // Deep dark shade
      ]
    };
  constructor(private router: Router) {
    this.setViewSize();
    window.addEventListener('resize', () => this.setViewSize());
  }

  setViewSize() {
    const width = window.innerWidth;
    if (width < 600) {
      this.view = [300, 250]; 
      this.areachartview=[300,250];// Small screens
    } else if (width < 900) {
      this.view = [300, 250];
      this.areachartview=[350,300]; // Medium screens
    } 
    else if (width<1200){
      this.view = [400, 350];
      this.areachartview=[450,300];
    }
    else {
      this.view = [400, 350]; // Large screens
      this.areachartview=[600,350];
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
  navigateToPPF(){
    window.scrollTo(0,0);
    this.router.navigate(['/ppfcalculator']);
  }
  navigateToEMI(){
    window.scrollTo(0,0);
    this.router.navigate(['/emicalculator']);
  }
  navigateToSIP(){
    window.scrollTo(0,0);
    this.router.navigate(['/sipcalculator']);
  }
  navigateToTAX(){
    window.scrollTo(0,0);
    this.router.navigate(['/taxcalculator']);
  }

  exportDataToExcel(data: any[] = [],calcname:string){
    const worksheet=XLSX.utils.json_to_sheet(data);
    const workbook=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook,worksheet,calcname);
    const fileName = `${calcname}.xlsx`;
    XLSX.writeFile(workbook,fileName);
  }
  
}

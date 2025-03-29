import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  scrollToCalculators(){
    const calcsection = document.getElementsByClassName('Calculators')[0];
    if(calcsection){
      calcsection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

import { Component } from '@angular/core';
import { UtilService } from '../shared/util.service';
import { MatCardModule} from '@angular/material/card'
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatCardModule,CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public service:UtilService){}

  menuOpen = false;
  displaymenu=false;

  showhide(){
    this.displaymenu=!this.displaymenu;
    document.body.style.overflow = this.displaymenu ? 'hidden' : 'auto';
  }
}

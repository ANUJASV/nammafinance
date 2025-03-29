import { Component } from '@angular/core';
import { UtilService } from '../shared/util.service';
import { MatCardModule} from '@angular/material/card'
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [MatCardModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public service:UtilService){}

  menuOpen = false;
  
}

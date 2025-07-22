import { Component } from '@angular/core';
import { UtilService } from '../shared/util.service';
import { MatCardModule} from '@angular/material/card'
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [MatCardModule,CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isHomePage=false;

  constructor(public service:UtilService, router:Router){
    router.events.pipe(filter(event=> event instanceof NavigationEnd))
    .subscribe((event:any)=>this.isHomePage=event.urlAfterRedirects === '/' || event.urlAfterRedirects === '/home'
  )};

  menuOpen = false;
  displaymenu=false;

  showhide(){
    this.displaymenu=!this.displaymenu;
    document.body.style.overflow = this.displaymenu ? 'hidden' : 'auto';
  }
}

import { Component, AfterViewInit, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { UtilService } from '../shared/util.service';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnInit, OnDestroy {

  images = [
    'bannerimg1.png',
    'bannerimg11.png',
    'bannerimg12.png',
    'bannerimg2.png',
    'bannerimg3.png',
    'bannerimg5.png',
    'bannerimg7.png',
    'bannerimg8.png',
    'bannerimg9.png',
    'bannerimg10.png'
    
  ];
  currentIndex = 0;
  currentImage = this.images[this.currentIndex];
  fadeIn = true;
  intervalId: any;

  constructor(public service:UtilService){}

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible'); // Remove class for fade-out effect
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.content').forEach(el => observer.observe(el));
  }
  scrollToCalculators(){
    const calcsection = document.getElementsByClassName('Calculators')[0];
    if(calcsection){
      calcsection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnInit() {
    this.startSlideshow();
  }

  startSlideshow() {
    this.intervalId = setInterval(() => {
      this.fadeIn = false; // Start fade-out effect

      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.currentImage = this.images[this.currentIndex];

        // Preload next image to prevent flickering
        const img = new Image();
        img.src = this.images[(this.currentIndex + 1) % this.images.length];

        this.fadeIn = true; // Start fade-in effect
      }, 500); // Delay before switching image (matches CSS transition time)
      
    }, 3000); // Change slide every 3 seconds
  }

  stopSlideshow() {
    clearInterval(this.intervalId);
  }

  ngOnDestroy() {
    this.stopSlideshow();
  }

}

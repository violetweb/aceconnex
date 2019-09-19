import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { CountdownTimerModule } from 'angular-countdown-timer';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {

  date = new Date('2019-01-26T00:00:00');
  


  customOptions: OwlOptions = {
    // autoWidth: true,
    loop: true,
    // items: '10',
    // margin: 10,
    // slideBy: 'page',
    // merge: true,
    autoplay: true,
    autoplayTimeout: 3000,
    // autoplayHoverPause: true,
		autoplaySpeed: 2000,
    dotsSpeed: 500,
    // dots: false,
    // dotsData: true,
    // mouseDrag: false,
    // touchDrag: false,
    // pullDrag: false,
    smartSpeed: 400,
    // fluidSpeed: 499,
    dragEndSpeed: 350,
    // dotsEach: 4,
    // center: true,
    // rewind: true,
    // rtl: true,
    // startPosition: 1,
    // navText: [ '<i class=fa-chevron-left>left</i>', '<i class=fa-chevron-right>right</i>' ],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      900: {
        items: 3
      }
    },
    // stagePadding: 40,
    nav: true
  }
  activeSlides: any;

   
      slidesStore: any[];
  
      getPassedData(data: SlidesOutputData) {
        this.activeSlides = data;
        console.log(this.activeSlides);
      }
  

  constructor() { }

  ngOnInit() {

    
  }

  triggerFunction() {
    console.log('Timer Ended');
  }

}

import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {

  images = input.required<string[]>();
  imageIndex: number = 0;

  current() {
    return this.images()[this.imageIndex];
  }

  previous() {
    if(this.imageIndex === 0){
      this.imageIndex = this.images().length - 1;
    }
    else{
      this.imageIndex -= 1;
    }
  }

  next() {
    if(this.imageIndex === this.images().length - 1){
      this.imageIndex = 0;
    }
    else{
      this.imageIndex += 1;
    }
  }

  jump(index: number) {
    this.imageIndex = index;
  }


}

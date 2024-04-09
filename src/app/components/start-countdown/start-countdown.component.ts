import { Component, OnInit, input, output } from '@angular/core';

@Component({
  selector: 'app-start-countdown',
  standalone: true,
  imports: [],
  templateUrl: './start-countdown.component.html',
  styleUrl: './start-countdown.component.css'
})
export class StartCountdownComponent implements OnInit {

  start = input.required<Date>();

  countDownFinished = output<undefined>();

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  ngOnInit(): void {
    this.setTime();
    const interval = setInterval(() => {
      const diff = this.setTime();
      if(diff <= 0){
        clearInterval(interval);
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.onCountDownFinish();
      }
    }, 500);
  }

  setTime(): number {
    const diff = this.start().getTime() - Date.now();

    const day = 1000 * 60 * 60 * 24;
    const hour = 1000 * 60 * 60;
    const minutes = 1000 * 60;
    const seconds = 1000;

    this.days = Math.floor(diff / day);
    this.hours = Math.floor((diff % day) / hour);
    this.minutes = Math.floor((diff % hour) / minutes);
    this.seconds = Math.floor((diff % minutes) / seconds);

    return diff;
  }

  onCountDownFinish(){
    this.countDownFinished.emit(undefined);
  }



}

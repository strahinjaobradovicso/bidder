import { Component, OnDestroy, OnInit, input, output } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-start-countdown',
  standalone: true,
  imports: [],
  templateUrl: './start-countdown.component.html',
  styleUrl: './start-countdown.component.css'
})
export class StartCountdownComponent implements OnInit, OnDestroy {

  start = input.required<Date>();

  countDownFinished = output<void>();

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  private readonly subscriptions = new Subscription();

  ngOnInit(): void {
    this.setTime();
    this.subscriptions.add(
      interval(500).subscribe(() => {
        const diff = this.setTime();
        if(diff === 0){
          this.ngOnDestroy();
          this.countDownFinished.emit();
        }
        else{
          this.setTime();
        }
      })
    );
  }

  setTime(): number {
    let diff = this.start().getTime() - Date.now();
    if(diff < 0)
      diff = 0;

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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

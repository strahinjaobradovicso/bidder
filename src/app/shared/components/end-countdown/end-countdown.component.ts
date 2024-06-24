import { Component, OnDestroy, OnInit, input, output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { NgStyle } from '@angular/common';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-end-countdown',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './end-countdown.component.html',
  styleUrl: './end-countdown.component.css'
})
export class EndCountdownComponent implements OnInit, OnDestroy {

  start = input.required<Date>();
  countDownFinished = output<void>();
  auctionDuration = environment.BIDDING.AUCTION_DURATION_SEC;
  secondsLeft = environment.BIDDING.AUCTION_DURATION_SEC;

  private readonly subscriptions = new Subscription();

  setSecondLeft(){
    let diff = Date.now() - this.start().getTime();
    this.secondsLeft = this.auctionDuration - Math.floor(diff/1000);
    if(this.secondsLeft < 0){
      this.secondsLeft = 0;
    }
  }

  ngOnInit(): void {
    this.setSecondLeft();
    this.subscriptions.add(
      interval(500).subscribe(() => {
        this.setSecondLeft();
        if(this.secondsLeft <= 0){
          this.ngOnDestroy();
          this.countDownFinished.emit();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

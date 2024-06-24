import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StartCountdownComponent } from '../../../shared/components/start-countdown/start-countdown.component';
import { EndCountdownComponent } from '../../../shared/components/end-countdown/end-countdown.component';
import { CarouselComponent } from '../../../item/components/carousel/carousel.component';
import { environment } from '../../../../environments/environment';
import { AuctionStatus } from '../../types/auctionStatus.enum';
import { AuctionModel } from '../../types/auctionModel.interface';

@Component({
  selector: 'app-auction-details',
  standalone: true,
  imports: [StartCountdownComponent, EndCountdownComponent, CarouselComponent],
  templateUrl: './auction-details.component.html',
  styleUrl: './auction-details.component.css'
})
export class AuctionDetailsComponent {

  auction: AuctionModel;

  started = AuctionStatus.Started;
  upcoming = AuctionStatus.Upcoming;
  done = AuctionStatus.Done;

  constructor(private router: Router){
    this.auction = this.router.getCurrentNavigation()?.extras.state?.[environment.AUCTION_KEY_STATE];
    this.auction.status = this.currentStatus();
  }

  currentStatus(): AuctionStatus {
    const diffInSec = (Date.now() - this.auction.start.getTime())/1000;
    if(diffInSec < 0){
      return this.upcoming;
    }
    if(diffInSec < environment.BIDDING.AUCTION_DURATION_SEC){
      return this.started;
    }
    return this.done;
  }

  changeToStarted(){
    this.auction.status = this.started;
  }

  changeToDone(){
    this.auction.status = this.done;
  }

  enterAuction(){
    this.router.navigate(['auction-bidding'], {
      state: {
        [environment.AUCTION_KEY_STATE]: this.auction,
      }
    }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuctionModel, AuctionStatus } from '../../interfaces/model/auctionModel';
import { StartCountdownComponent } from '../start-countdown/start-countdown.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-auction-details',
  standalone: true,
  imports: [StartCountdownComponent, CarouselComponent],
  templateUrl: './auction-details.component.html',
  styleUrl: './auction-details.component.css'
})
export class AuctionDetailsComponent {

  auction: AuctionModel;

  started = AuctionStatus.Started;
  upcoming = AuctionStatus.Upcoming;

  constructor(private router: Router){
    this.auction = this.router.getCurrentNavigation()!.extras.state as AuctionModel;
  }

  onCountDownFinished(){
    this.auction.status = this.started;
  }

  enterAuction(){
    this.router.navigate(['auction-bidding'], {
      queryParams: {
        [environment.AUCTION_KEY_PARAM]: this.auction.id,
        [environment.ITEM_ID_PARAM]: this.auction.ItemModel.id
      }
    }
    )
  }
}

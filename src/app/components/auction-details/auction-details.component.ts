import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuctionModel, AuctionStatus } from '../../interfaces/model/auctionModel';
import { StartCountdownComponent } from '../start-countdown/start-countdown.component';

@Component({
  selector: 'app-auction-details',
  standalone: true,
  imports: [StartCountdownComponent],
  templateUrl: './auction-details.component.html',
  styleUrl: './auction-details.component.css'
})
export class AuctionDetailsComponent {

  auction: AuctionModel;

  started = AuctionStatus.Started;
  upcoming = AuctionStatus.Upcoming;

  constructor(private router: Router){
    this.auction = this.router.getCurrentNavigation()!.extras.state  as AuctionModel;
    this.auction.start = new Date(this.auction.start);
  }

  onCountDownFinished(){
    this.auction.status = this.started;
  }

  enterAuction(){

  }
}

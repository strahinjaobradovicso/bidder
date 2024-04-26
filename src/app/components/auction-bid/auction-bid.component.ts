import { Component, OnDestroy, OnInit } from '@angular/core';
import { BidService } from '../../services/bid.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ItemModel } from '../../interfaces/model/itemModel';
import { BidToClient, BidToServer } from '../../interfaces/model/bidModel';
import { AuctionModel } from '../../interfaces/model/auctionModel';
import { CarouselComponent } from '../carousel/carousel.component';
import { AuctionBiddingFormComponent } from '../auction-bidding-form/auction-bidding-form.component';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../error/error.component';
import { EndCountdownComponent } from '../end-countdown/end-countdown.component';
import { ProfileComponent } from '../profile/profile.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auction-bid',
  standalone: true,
  imports: [CarouselComponent, AuctionBiddingFormComponent, CommonModule, ErrorComponent, EndCountdownComponent, ProfileComponent],
  templateUrl: './auction-bid.component.html',
  styleUrl: './auction-bid.component.css'
})
export class AuctionBidComponent implements OnInit, OnDestroy {

  auction: AuctionModel | null;
  item: ItemModel | undefined;

  error: Error | null = null;
  askingBid: BidToClient | undefined;
  bidRejection: string | null = null;

  private readonly subscriptions = new Subscription();

  constructor(private router: Router, private bidService: BidService) { 
    this.auction = this.router.getCurrentNavigation()?.extras.state?.[environment.AUCTION_KEY_STATE];
    this.item = this.auction?.ItemModel;
  }

  ngOnInit(): void {
    if(!this.auction?.id){
      this.error = new Error('auction info is missing');
      return;
    }
    this.subscriptions.add(
      this.bidService.bidAccept.subscribe((bid) => {
        this.askingBid = bid;
      })
    );
    this.subscriptions.add(
      this.bidService.bidReject.subscribe((message) => {
        this.bidRejection = message;
      })
    );
    this.subscriptions.add(
      this.bidService.auctionReject.subscribe(message => {
        this.error = new Error(message);
      })
    );

    this.bidService.enterAuction(this.auction.id.toString());
  }


  placeBid(value: number){
    this.bidRejection = null;
    let bid: BidToServer = {
      auctionId: this.auction!.id.toString(),
      value: value
    }
    this.bidService.placeBid(bid);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
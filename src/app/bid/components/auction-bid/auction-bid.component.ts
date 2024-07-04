import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuctionBiddingFormComponent } from '../auction-bidding-form/auction-bidding-form.component';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../shared/components/error/error.component';
import { EndCountdownComponent } from '../../../shared/components/end-countdown/end-countdown.component';
import { ProfileComponent } from '../../../profile/components/profile/profile.component';
import { CarouselComponent } from '../../../item/components/carousel/carousel.component';
import { AuctionModel } from '../../../auction/types/auctionModel.interface';
import { ItemModel } from '../../../item/types/itemModel.interface';
import { BiddingStore } from '../../store/bidding.store';

@Component({
  selector: 'app-auction-bid',
  standalone: true,
  imports: [CarouselComponent, AuctionBiddingFormComponent, CommonModule, ErrorComponent, EndCountdownComponent, ProfileComponent],
  templateUrl: './auction-bid.component.html',
  styleUrl: './auction-bid.component.css',
  providers: [BiddingStore]
})
export class AuctionBidComponent implements OnInit {

  readonly store = inject(BiddingStore);
  auction: AuctionModel;
  item: ItemModel;

  constructor(private router: Router) { 
    this.auction = this.router.getCurrentNavigation()?.extras.state?.[environment.AUCTION_KEY_STATE];
    this.item = this.auction.ItemModel;
  }
  
  ngOnInit(): void {
    this.store.setAuctionRoom(this.auction.id.toString());
  }

}
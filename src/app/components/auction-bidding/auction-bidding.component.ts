import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BiddingService } from '../../services/bidding.service';
import { environment } from '../../../environments/environment';
import { ItemModel } from '../../interfaces/model/itemModel';
import { CarouselComponent } from '../carousel/carousel.component';
import { Observable, merge, tap, map, Subscription } from 'rxjs';
import { BidToClient } from '../../interfaces/socket/model/bidModel';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../error/error.component';
import { AuctionBiddingFormComponent } from '../auction-bidding-form/auction-bidding-form.component';

@Component({
  selector: 'app-auction-bidding',
  standalone: true,
  imports: [CarouselComponent, AuctionBiddingFormComponent, CommonModule, ErrorComponent],
  templateUrl: './auction-bidding.component.html',
  styleUrl: './auction-bidding.component.css'
})
export class AuctionBiddingComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  auctionBid$: Observable<BidToClient> | undefined;

  auctionKey: string | null;
  item: ItemModel | undefined;
  error: Error | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private biddingService: BiddingService){
    this.auctionKey = this.route.snapshot.queryParamMap.get(environment.AUCTION_KEY_PARAM);
    this.item = this.router.getCurrentNavigation()?.extras.state?.[environment.ITEM_KEY_STATE];
  }

  ngOnInit(): void {
    if(!this.auctionKey || !this.item){
      this.error = new Error('not enough info');
      return;
    }

    this.subscriptions.push(
      this.biddingService.enterAuctionToServer(this.auctionKey).subscribe({
        error: (error) => {
          this.error = error;
        },
        complete: () => {
          console.log('connected');
        } 
      })
    )

    this.auctionBid$ = merge(
      this.biddingService.enterAuctionToClient(),
      this.biddingService.placeBidToClient(),
      this.biddingService.loweredAskBid(),
      this.biddingService.auctionResult()
    ).pipe(
      map((bid: BidToClient) => {
        return bid;
      }),
      tap({
        error: (error) => {
          this.error = error;
        }
      })
    )
  }

  bid(value: number){
    this.biddingService.placeBidToServer(this.auctionKey!, value);
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}

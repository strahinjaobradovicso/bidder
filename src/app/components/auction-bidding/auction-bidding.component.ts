import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BiddingService } from '../../services/bidding.service';
import { environment } from '../../../environments/environment';
import { AuctionStatus } from '../../interfaces/model/auctionModel';
import { ItemModel } from '../../interfaces/model/itemModel';
import { CarouselComponent } from '../carousel/carousel.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable, merge, tap, map, Subscription } from 'rxjs';
import { BidToClient } from '../../interfaces/socket/model/bidModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auction-bidding',
  standalone: true,
  imports: [CarouselComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './auction-bidding.component.html',
  styleUrl: './auction-bidding.component.css'
})
export class AuctionBiddingComponent implements OnInit, OnDestroy {

  auctionKey: string | null;
  auctionBid$!: Observable<BidToClient>;
  auctionStart?: Date;
  auctionStatus = AuctionStatus.Started;
  item!: ItemModel;


  askValue!: number;

  subscriptions: Subscription[] = [];

  bidForm = this.formBuilder.group({
    amount: 0
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private biddingService: BiddingService,
    private formBuilder: FormBuilder,
  ){
    this.auctionKey = this.route.snapshot.queryParamMap.get(environment.AUCTION_KEY_PARAM);
    this.item = this.router.getCurrentNavigation()?.extras.state![environment.ITEM_KEY_STATE];
  }

  ngOnInit(): void {
    if(!this.auctionKey || !this.item){
      return;
    }

    this.subscriptions.push(
      this.biddingService.enterAuctionToServer(this.auctionKey).subscribe({
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          console.log('connected');
        } 
      })
    )

    this.auctionBid$ = merge(
      this.biddingService.enterAuctionToClient(),
      this.biddingService.placeBidToClient(),
      this.biddingService.loweredAskBid()
    ).pipe(
      map((bid: BidToClient) => {
        if(bid.auctionRules){
          this.auctionStart = new Date(bid.auctionRules.start);
        }
        this.askValue = bid.askValue;
        return bid;
      }),
    )

    this.subscriptions.push(
      this.biddingService.auctionResult().subscribe({
        next: (v) => {
          console.log(v);
        }
      })
    )
  }

  bid(){
    this.biddingService.placeBidToServer(this.auctionKey!, this.askValue);
  }

  overbid(){
    const input = this.bidForm.value.amount;
    if(input && input >= this.askValue){
      this.biddingService.placeBidToServer(this.auctionKey!, input);
      this.bidForm.reset();
    }
    else{
      console.log('input not valid');
    }
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}

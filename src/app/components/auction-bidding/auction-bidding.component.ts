import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BiddingService } from '../../services/bidding.service';
import { environment } from '../../../environments/environment';
import { AuctionStatus } from '../../interfaces/model/auctionModel';
import { ItemModel } from '../../interfaces/model/itemModel';
import { CarouselComponent } from '../carousel/carousel.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auction-bidding',
  standalone: true,
  imports: [CarouselComponent, ReactiveFormsModule],
  templateUrl: './auction-bidding.component.html',
  styleUrl: './auction-bidding.component.css'
})
export class AuctionBiddingComponent implements OnInit {

  auctionKey: string | null;
  auctionBid: any;
  auctionStart?: Date;
  auctionStatus = AuctionStatus.Started;
  item?: ItemModel;

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
    this.biddingService.enterAuctionToServer(this.auctionKey).subscribe({
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log('connected');
      }
    })

    this.biddingService.enterAuctionToClient().subscribe({
      next: (v) => {
        this.auctionBid = v.auctionBid;
        this.auctionStart = new Date(this.auctionBid.auctionRules.start);
      },
      error: (e) => {
        console.log(e);
      }
    })

    this.biddingService.placeBidToClient().subscribe({
      next: (v) => {
        this.auctionBid.askValue = v.auctionBid.askValue;
        this.auctionBid.bidder = v.auctionBid.bidder;
        this.auctionBid.reachedValue = v.auctionBid.reachedValue;
      },
      error: (e) => {
        console.log(e);
      }
    })

    this.biddingService.loweredAskBid().subscribe({
      next: (v) => {
        this.auctionBid.askValue = v.askValue;
      }
    })

    this.biddingService.auctionResult().subscribe({
      next: (v) => {
        console.log(v);
      }
    })
  }

  bid(){
    this.biddingService.placeBidToServer(this.auctionKey!, this.auctionBid.askValue);
  }

  overbid(){
    const input = this.bidForm.value.amount;
    if(input && input >= this.auctionBid.askValue){
      this.biddingService.placeBidToServer(this.auctionKey!, input);
      this.bidForm.reset();
    }
    else{
      console.log('input not valid');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  itemId: string | null;
  auctionBid: any;
  auctionStart?: Date;
  auctionStatus = AuctionStatus.Started;
  item?: ItemModel;

  bidForm = this.formBuilder.group({
    amount: 0
  })

  constructor(
    private route: ActivatedRoute,
    private biddingService: BiddingService,
    private formBuilder: FormBuilder
  ){
    this.auctionKey = this.route.snapshot.queryParamMap.get(environment.AUCTION_KEY_PARAM);
    this.itemId = this.route.snapshot.queryParamMap.get(environment.ITEM_ID_PARAM);
  }

  ngOnInit(): void {
   
  }

  bid(){

  }

  overbid(){

  }
}

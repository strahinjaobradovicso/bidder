import { Component, OnInit, output, input } from '@angular/core';
import { AuctionModel } from '../../interfaces/model/auctionModel';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-auction',
  standalone: true,
  imports: [],
  templateUrl: './auction.component.html',
  styleUrl: './auction.component.css'
})
export class AuctionComponent {

  auction = input.required<AuctionModel>();

  constructor(private router: Router){}

  openAuctionPage() {
    this.router.navigate(['/auction-details'], { 
      state: {
        [environment.AUCTION_KEY_STATE]: this.auction()
      }
    });
  }
}

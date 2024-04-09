import { Component, OnInit, output, input } from '@angular/core';
import { AuctionModel } from '../../interfaces/model/auctionModel';

@Component({
  selector: 'app-auction',
  standalone: true,
  imports: [],
  templateUrl: './auction.component.html',
  styleUrl: './auction.component.css'
})
export class AuctionComponent implements OnInit {

  auction = input.required<AuctionModel>();

  ngOnInit(): void {
    this.auction().ItemModel.imageUrls = [];
  }

  openAuctionPage() {
    
  }
}

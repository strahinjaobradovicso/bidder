import { Component, OnInit, output, input } from '@angular/core';
import { AuctionModel } from '../../interfaces/model/auctionModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auction',
  standalone: true,
  imports: [],
  templateUrl: './auction.component.html',
  styleUrl: './auction.component.css'
})
export class AuctionComponent implements OnInit {

  auction = input.required<AuctionModel>();

  constructor(private router: Router){}

  ngOnInit(): void {
    this.auction().ItemModel.imageUrls = [];
  }

  openAuctionPage() {
    this.router.navigateByUrl('/auction-details', { info: this.auction() });
  }
}

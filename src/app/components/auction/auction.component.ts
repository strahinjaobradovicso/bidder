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
export class AuctionComponent implements OnInit {

  auction = input.required<AuctionModel>();

  constructor(private router: Router){}

  ngOnInit(): void {
    this.auction().ItemModel.imageUrls = [];
    const auctionItem = this.auction().ItemModel;
    for (const imageModel of auctionItem.ImageModels) {
      auctionItem.imageUrls.push(environment.API_URL + '/' + imageModel.imageData);
    }
  }

  openAuctionPage() {
    this.router.navigate(['/auction-details'], { state: this.auction() });
  }
}

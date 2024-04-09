import { Component, OnInit } from '@angular/core';
import { AuctionModel } from '../../interfaces/model/auctionModel';
import { AuctionService } from '../../services/auction.service';
import { AuctionQuery } from '../../interfaces/query/auctionQuery';
import { toLocal } from '../../util/time';
import { AuctionComponent } from '../auction/auction.component';

@Component({
  selector: 'app-auction-list',
  standalone: true,
  imports: [AuctionComponent],
  templateUrl: './auction-list.component.html',
  styleUrl: './auction-list.component.css'
})
export class AuctionListComponent implements OnInit {

  auctions: AuctionModel[] = [];

  page: number = 1;
  itemsPerPage: number = 12;

  constructor(private auctionService: AuctionService){}

  ngOnInit(): void {
    const query: AuctionQuery = {
      page: this.page,
      itemsPerPage: this.itemsPerPage
    }

    this.auctionService.getAuctions(query).subscribe((res: any) => {
      for (const auction of res.rows) {
        auction.start = toLocal(auction.start.toString());
      }
      this.auctions = res.rows;
      console.log(this.auctions);
    })

  }

}

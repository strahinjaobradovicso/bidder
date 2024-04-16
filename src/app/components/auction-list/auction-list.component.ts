import { Component, OnInit, input } from '@angular/core';
import { AuctionModel } from '../../interfaces/model/auctionModel';
import { AuctionService } from '../../services/auction.service';
import { AuctionQuery } from '../../interfaces/query/auctionQuery';
import { toLocal } from '../../util/time';
import { AuctionComponent } from '../auction/auction.component';
import { PaginationResponse } from '../../interfaces/response/paginationResponse';
import { Observable, catchError, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-auction-list',
  standalone: true,
  imports: [AuctionComponent, CommonModule, ErrorComponent],
  templateUrl: './auction-list.component.html',
  styleUrl: './auction-list.component.css'
})
export class AuctionListComponent implements OnInit {

  auctions$!: Observable<AuctionModel[]>;
  error: Error | null = null;

  page: number = 1;
  itemsPerPage: number = 12;

  ownerId = input<number>();
  winnerId = input<number>();

  totalRecords?: number;

  constructor(private auctionService: AuctionService){}

  ngOnInit(): void {
    const query: AuctionQuery = {
      page: this.page,
      itemsPerPage: this.itemsPerPage,
      itemOwner: this.ownerId(),
      auctionWinner: this.winnerId()
    }

    this.auctions$ = this.auctionService.getAuctions(query).pipe(
      map((res:PaginationResponse<AuctionModel>) => {
        this.totalRecords = res.count;
        let auctions: AuctionModel[] = res.rows;
        return auctions.map(auction => {
          auction.start = toLocal(auction.start.toString());
          return auction;
        }); 
      }),
      tap({
        error: (error) => {
          this.error = error;
        },
      }), 
      catchError(err => {
        return of([]);
      }),
    )
  }

}

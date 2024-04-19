import { Component, OnInit, input, output } from '@angular/core';
import { AuctionModel } from '../../interfaces/model/auctionModel';
import { AuctionService } from '../../services/auction.service';
import { AuctionQuery } from '../../interfaces/query/auctionQuery';
import { toLocal } from '../../util/time';
import { AuctionComponent } from '../auction/auction.component';
import { PaginationResponse } from '../../interfaces/response/paginationResponse';
import { Observable, Subject, catchError, of, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { ErrorComponent } from '../error/error.component';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auction-list',
  standalone: true,
  imports: [AuctionComponent, CommonModule, ErrorComponent],
  templateUrl: './auction-list.component.html',
  styleUrl: './auction-list.component.css'
})
export class AuctionListComponent implements OnInit {

  querySubject = input.required<Subject<AuctionQuery>>();
  auctions$: Observable<AuctionModel[]> | undefined;
  error: Error | null = null;

  totalRecords = output<number>();

  constructor(private auctionService: AuctionService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.auctions$ = this.querySubject().pipe(
      switchMap((query: AuctionQuery) => {
        return this.auctionService.getAuctions(query).pipe(
          map((res:PaginationResponse<AuctionModel>) => {
            this.totalRecords.emit(res.count);
            let auctions: AuctionModel[] = res.rows;
            for (const auction of auctions) {
              for (const imageModel of auction.ItemModel.ImageModels) {
                imageModel.imageData = `${environment.API_URL}/${imageModel.imageData}`; 
              }
            }
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
      })
    )
  }
}

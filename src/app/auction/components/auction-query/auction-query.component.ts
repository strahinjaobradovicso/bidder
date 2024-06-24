import { Component, OnInit, input } from '@angular/core';
import { AuctionListComponent } from '../auction-list/auction-list.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { AuctionStatus } from '../../types/auctionStatus.enum';
import { AuctionQuery } from '../../types/auctionQuery.inteface';

@Component({
  selector: 'app-auction-query',
  standalone: true,
  imports: [AuctionListComponent, SearchComponent, PaginationComponent],
  templateUrl: './auction-query.component.html',
  styleUrl: './auction-query.component.css'
})
export class AuctionQueryComponent implements OnInit {

  query: AuctionQuery = {
    page: 1,
    itemsPerPage: 12,
    date: undefined,
    itemTitle: undefined,
    itemOwner: undefined,
    auctionWinner: undefined,
    status: undefined
  }
  totalRecords: number = 0;

  ownerId = input<number>();
  winnerId = input<number>();
  querySubject = new BehaviorSubject<AuctionQuery>(this.query);

  ngOnInit(): void {
    if(this.ownerId()){
      this.query.itemOwner = this.ownerId();
    }
    if(this.winnerId()){
      this.query.auctionWinner = this.winnerId();
    }
    if(!this.ownerId() && !this.winnerId()) {
      this.query.status = AuctionStatus.Upcoming;
    }
  }

  setTotalRecords(total: number){
    this.totalRecords = total;
  }

  searchUpdate(itemTitle: string){
    this.query.page = 1;
    this.query.itemTitle = itemTitle;
    this.querySubject.next(this.query);
  }

  pageUpdate(page: number){
   this.query.page = page; 
   this.querySubject.next(this.query);
  }
}

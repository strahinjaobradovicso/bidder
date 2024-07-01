import { Component, input} from '@angular/core';
import { AuctionComponent } from '../auction/auction.component';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../shared/components/error/error.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { AuctionModel } from '../../types/auctionModel.interface';

@Component({
  selector: 'app-auction-list',
  standalone: true,
  imports: [AuctionComponent, CommonModule, ErrorComponent, SearchComponent, PaginationComponent],
  templateUrl: './auction-list.component.html',
  styleUrl: './auction-list.component.css',
})
export class AuctionListComponent {

  auctions = input.required<AuctionModel[]>();
  loading = input.required<boolean>();
  error = input.required<Error | null>();

}

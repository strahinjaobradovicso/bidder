import { Component } from '@angular/core';
import { ItemQuery } from '../../interfaces/query/itemQuery';
import { BehaviorSubject } from 'rxjs';
import { ItemListComponent } from '../items/item-list.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-item-query',
  standalone: true,
  imports: [ItemListComponent, SearchComponent, PaginationComponent],
  templateUrl: './item-query.component.html',
  styleUrl: './item-query.component.css'
})
export class ItemQueryComponent {

    query: ItemQuery = {
      page:1,
      itemsPerPage: 12,
      title: undefined
    }

    totalRecords = 0;

    querySubject = new BehaviorSubject<ItemQuery>(this.query);

    setTotalRecords(total: number){
      this.totalRecords = total;
    }

    searchUpdate(title: string){
      this.query.page = 1;
      this.query.title = title;
      this.querySubject.next(this.query);
    }

    pageUpdate(page: number){
      this.query.page = page;
      this.querySubject.next(this.query);
    }

}

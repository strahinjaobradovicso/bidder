import { Component, OnInit } from '@angular/core';
import { ItemModel } from '../../interfaces/model/itemModel';
import { ItemService } from '../../services/item.service';
import { ItemQuery } from '../../interfaces/query/itemQuery';
import { PaginationResponse } from '../../interfaces/response/paginationResponse';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit {

  items: ItemModel[] = [];

  page = 1;
  itemsPerPage = 12;
  totalRecords = 0;

  constructor(private itemService: ItemService){}

  ngOnInit(): void {
    const query: ItemQuery = {
      page: this.page,
      itemsPerPage: this.itemsPerPage
    }
    this.itemService.getUsersItems(query).subscribe((res: PaginationResponse<ItemModel>) => {
      this.items = res.rows;
      this.totalRecords = res.count;
    })
  }

}

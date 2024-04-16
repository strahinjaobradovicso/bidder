import { Component, OnInit } from '@angular/core';
import { ItemModel } from '../../interfaces/model/itemModel';
import { ItemService } from '../../services/item.service';
import { ItemQuery } from '../../interfaces/query/itemQuery';
import { PaginationResponse } from '../../interfaces/response/paginationResponse';
import { ItemComponent } from '../item/item.component';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [ItemComponent, CommonModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit {

  items$!: Observable<ItemModel[]>;

  page = 1;
  itemsPerPage = 12;
  totalRecords!: number;

  constructor(private itemService: ItemService){}

  ngOnInit(): void {
    const query: ItemQuery = {
      page: this.page,
      itemsPerPage: this.itemsPerPage
    }
    this.items$ = this.itemService.getUsersItems(query).pipe(
      map((res: PaginationResponse<ItemModel>) => {
        let items: ItemModel[] = res.rows;
        this.totalRecords = res.count;
        return items.map(item => {
          for (const imageModel of item.ImageModels) {
            imageModel.imageData = `${environment.API_URL}/${imageModel.imageData}`; 
          }
          return item;          
        })
      })
    )
  }
}

import { Component, OnInit, input, output } from '@angular/core';
import { ItemModel } from '../../interfaces/model/itemModel';
import { ItemService } from '../../services/item.service';
import { ItemQuery } from '../../interfaces/query/itemQuery';
import { PaginationResponse } from '../../interfaces/response/paginationResponse';
import { ItemComponent } from '../item/item.component';
import { environment } from '../../../environments/environment';
import { Observable, Subject, switchMap } from 'rxjs';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [ItemComponent, CommonModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit {

  querySubject = input.required<Subject<ItemQuery>>();
  items$: Observable<ItemModel[]> | undefined;
  totalRecords = output<number>();

  constructor(private itemService: ItemService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.items$ = this.querySubject().pipe(
      switchMap((query: ItemQuery) => {
        return this.itemService.getUsersItems(query).pipe(
          map((res: PaginationResponse<ItemModel>) => {
            this.totalRecords.emit(res.count);
            let items: ItemModel[] = res.rows;
            return items.map(item => {
              for (const imageModel of item.ImageModels) {
                imageModel.imageData = `${environment.API_URL}/${imageModel.imageData}`; 
              }
              return item;          
            })
          })
        )
    })
  )
  }
}

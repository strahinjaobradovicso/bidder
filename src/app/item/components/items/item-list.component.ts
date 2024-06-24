import { Component, OnInit, input, output } from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { environment } from '../../../../environments/environment';
import { Observable, Subject, catchError, of, switchMap } from 'rxjs';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ErrorComponent } from '../../../shared/components/error/error.component';
import { ItemQuery } from '../../types/itemQuery.interface';
import { ItemService } from '../../services/item.service';
import { PaginationResponse } from '../../../shared/types/paginationResponse.interface';
import { ItemModel } from '../../types/itemModel.interface';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [ItemComponent, CommonModule, ErrorComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit {

  querySubject = input.required<Subject<ItemQuery>>();
  items$: Observable<ItemModel[]> | undefined;
  totalRecords = output<number>();

  error: Error | null = null;

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
          }),
          catchError(error => {
            this.error = error;
            return of([]);
          })
        )
    })
  )
  }
}

import { NgStyle } from '@angular/common';
import { Component, OnInit, effect, inject, input, output } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { PaginationStore } from './store/pagination.store';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css', 
  providers: [PaginationStore]
})
export class PaginationComponent implements OnInit {

  store = inject(PaginationStore);

  pageSelected = output<number>();
  
  totalRecords = input.required<number>();
  recordsPerPage = input.required<number>();
  paginationReset = input({index: 1, toLoad: false});


  totalRecords$ = toObservable(this.totalRecords);
  recordsPerPage$ = toObservable(this.recordsPerPage);
  paginationReset$ = toObservable(this.paginationReset);


  ngOnInit(): void {
    this.store.setTotalRecords(this.totalRecords$);
    this.store.setRecordsPerPage(this.recordsPerPage$);
    this.store.setPaginationReset(this.paginationReset$);

  }

  constructor() {
    effect(() => {
      const page = this.store.page(); 
      if(page.toLoad){
        this.pageSelected.emit(page.index);
      }
    })
  }

  previousPage(){
    if(this.store.page().index > 1)
      this.store.previousPage();
  }

  nextPage(){
    if(this.store.page().index < this.store.lastPage()){
      this.store.nextPage();
    }
  }

}

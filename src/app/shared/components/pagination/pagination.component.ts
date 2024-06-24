import { NgStyle } from '@angular/common';
import { Component, OnChanges, SimpleChanges, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnChanges {

  pageSelected = output<number>();
  totalRecords = input.required<number>();
  recordsPerPage = input.required<number>();

  page: number = 1;
  pageList: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if(this.totalRecords() > 0){
      this.page = 1;
      this.setPageList();
    }
  }

  previousPage(){
    if(this.page > 1){
      this.page--;
      this.pageSelected.emit(this.page);
    }
  }

  nextPage(){
    let lastPage = Math.ceil(this.totalRecords() / this.recordsPerPage());
    if(this.page < lastPage){
      this.page++;
      this.pageSelected.emit(this.page);
    }
  }

  setPageList(){
    const pages = [];
    let lastPage = Math.ceil(this.totalRecords() / this.recordsPerPage());
    pages.push(1);

    for (let before = this.page - 3; before < this.page; before++) {
      if(before > 1){
        pages.push(before);
      }
    }

    if(this.page > 1 && this.page < lastPage){
      pages.push(this.page);
    }

    for (let after = this.page + 1; after <= this.page + 3; after++) {
      if(after < lastPage){
        pages.push(after);
      }      
    }

    if(lastPage > 1)
      pages.push(lastPage);

    this.pageList = pages;
  }

  setPage(page: number){
    this.page = page;
    this.setPageList();
    this.pageSelected.emit(page);
  }

}

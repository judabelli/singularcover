import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges, SimpleChange } from '@angular/core';
import {Observable} from 'rxjs';
import {PaginationService} from "./pagination.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit, OnChanges {
  @Input() offset: number = 0;
  @Input() limit: number = 1;
  @Input() size: number = 1;
  @Input() range: number = 3;
  @Input() title : string;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private paginationService: PaginationService) {
  }

  currentPage: number;
  totalPages: number;
  pages: Observable<number[]>;

  isValidPageNumber(page: number, totalPages: number): boolean {
    return page > 0 && page <= totalPages;
  }

  selectPage(page: number, event) {
    this.cancelEvent(event);
    if (this.isValidPageNumber(page, this.totalPages)) {
      this.offset = (page - 1) * this.limit;
      this.pageChange.emit(this.offset);
      this.ngOnChanges();
    }
  }
  cancelEvent(event) {
    event.preventDefault();
  }
  getPages(offset: number, limit: number, size: number) {
    this.currentPage = this.getCurrentPage(offset, limit);
    this.totalPages = this.getTotalPages(limit, size);
    this.pages = Observable.range(1, this.totalPages)
      .toArray();
  }

  ngOnChanges() {
    this.getPages(this.offset, this.limit, this.size);
  }

  incrementPage(page : number) {
    page += 1;
  }

  getCurrentPage(offset: number, limit: number): number {
    return Math.floor(offset / limit) + 1;
  }

  getTotalPages(limit: number, size: number): number {
    return Math.ceil(Math.max(size, 1) / Math.max(limit, 1));
  }

  ngOnInit() {
    this.paginationService.onResetPagination.subscribe(isReset => {
      this.offset = 1;
      this.getPages(this.offset, this.limit, this.size);
    });
    this.getPages(this.offset, this.limit, this.size);
  }
}

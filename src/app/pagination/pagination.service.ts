import {Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class PaginationService {

  @Output() onResetPagination: EventEmitter<boolean> = new EventEmitter();

  resetPagination() {
    this.onResetPagination.emit(true);
  }

}

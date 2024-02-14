import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Dish} from "../../dishes/dish.model";

export interface NumberedPagination {
  currentPage: number;
  maxPages: number;
  pages: number[];
}

export enum RulerFactoryOption {
  Start = 'START',
  End = 'END',
  Default = 'DEFAULT',
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() data: Dish[];
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 5;
  @Input() rulerLength: number;
  @Output() pageChanged: EventEmitter<Dish[]> = new EventEmitter<Dish[]>();
  maxPages: number;
  total: number;

  get paginatedItems(): Dish[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.data.slice(start, end);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.total = changes['data'].currentValue.length;
      this.maxPages = Math.ceil(this.total / this.itemsPerPage);
      this.rulerLength = Math.min(5, this.maxPages);
      if (changes['data'].previousValue && this.total !== changes['data'].previousValue.length) {
        this.currentPage = 1;
      }
      this.pageChanged.emit(this.paginatedItems);
    }
  }

  get pagination(): NumberedPagination {
    const {currentPage, maxPages, rulerLength} = this;
    const pages = ruler(currentPage, maxPages, rulerLength);
    return {currentPage, maxPages, pages} as NumberedPagination;
  }

  changePage(pageNumber: number): void {
    if (allowNavigation(pageNumber, this.currentPage, this.maxPages)) {
      this.currentPage = pageNumber;
      this.pageChanged.emit(this.paginatedItems);
    }
  }


  trackByFn(index: number): number {
    return index;
  }
}

const ruler = (
  currentIndex: number,
  maxPages: number,
  rulerLength: number
): number[] => {
  const array = new Array(rulerLength).fill(null);
  const min = Math.floor(rulerLength / 2);

  return array.map((_, index) =>
    rulerFactory(currentIndex, index, min, maxPages, rulerLength)
  );
};

const rulerOption = (
  currentIndex: number,
  min: number,
  maxPages: number
): RulerFactoryOption => {
  return currentIndex <= min
    ? RulerFactoryOption.Start
    : currentIndex >= maxPages - min
      ? RulerFactoryOption.End
      : RulerFactoryOption.Default;
};

const rulerFactory = (
  currentIndex: number,
  index: number,
  min: number,
  maxPages: number,
  rulerLength: number
): number => {
  const factory = {
    [RulerFactoryOption.Start]: () => index + 1,
    [RulerFactoryOption.End]: () => maxPages - rulerLength + index + 1,
    [RulerFactoryOption.Default]: () => currentIndex + index - min,
  };

  return factory[rulerOption(currentIndex, min, maxPages)]();
};

const allowNavigation = (
  pageNumber: number,
  currentPage: number,
  maxPages: number
): boolean => {
  return pageNumber !== currentPage && pageNumber > 0 && pageNumber <= maxPages;
}

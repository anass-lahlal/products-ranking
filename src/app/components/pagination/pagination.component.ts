import { Component } from "@angular/core";
import {
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Observable } from "rxjs";
import { TableService } from "src/app/services/table.service";
import { Pagination } from "../../state/table/table.model";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"],
})
export class PaginationComponent {
  pagination$: Observable<Pagination>;
  pages: number[];
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;

  constructor(private tableService: TableService) {
    this.pagination$ = tableService.getPagination();
    this.pagination$.subscribe((state) => this.generatePageNumber(state));
  }

  generatePageNumber(pagination: Pagination) {
    const pages = pagination.pages;
    const activePage = pagination.page;
    const displayedPagesCount = 5;
    let leftOffset = 1;
    let rightOffset = Math.min(displayedPagesCount, pages);

    if (pages > displayedPagesCount) {
      const pagesOffset = Math.ceil((displayedPagesCount - 1) / 2);
      leftOffset = activePage - pagesOffset;
      rightOffset = activePage + pagesOffset;
      if (leftOffset < 1) {
        rightOffset += leftOffset * -1 + 1;
        leftOffset = 1;
      }

      if (rightOffset > pages) {
        leftOffset -= rightOffset - pages;
        rightOffset = pages;
      }
    }

    let pageNumbers = [];
    for (let i = leftOffset; i <= rightOffset; i++) {
      pageNumbers = [...pageNumbers, i];
    }

    this.pages = pageNumbers;
  }

  onPrevPage() {
    this.tableService.getPreviousPage();
  }

  onNextPage() {
    this.tableService.getNextPage();
  }

  onPageClick(page: number) {
    this.tableService.getPage(page);
  }

  onRowsCountChange(count: string) {
    this.tableService.updateRowsCount(parseInt(count));
  }
}

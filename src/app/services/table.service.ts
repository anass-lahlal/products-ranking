import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../models/App";
import * as tableActions from "../state/table/table.actions";
import { Table, Column, Pagination, Sort } from "../state/table/table.model";

@Injectable({
  providedIn: "root",
})
export class TableService {
  constructor(private store: Store<AppState>) {}

  getColumns(): Observable<Column[]> {
    return this.store.select((state) => state.table.columns);
  }

  getTableData(): Observable<any[]> {
    return this.store.select((state) => state.table.tableData);
  }

  getPagination(): Observable<Pagination> {
    return this.store.select((state) => state.table.pagination);
  }

  getSort(): Observable<Sort> {
    return this.store.select((state) => state.table.sort);
  }

  toggleColumn(column: Column) {
    this.store.dispatch(new tableActions.toggleColumn(column));
  }

  updateTableData(data: any[]) {
    this.store.dispatch(new tableActions.updateTableData(data));
  }

  getFirstPage() {
    this.store.dispatch(new tableActions.getFirstPage());
  }

  getLastPage() {
    this.store.dispatch(new tableActions.getLastPage());
  }

  getNextPage() {
    this.store.dispatch(new tableActions.getNextPage());
  }

  getPreviousPage() {
    this.store.dispatch(new tableActions.getPreviousPage());
  }

  getPage(page: number) {
    this.store.dispatch(new tableActions.getPage(page));
  }

  updateRowsCount(count: number) {
    this.store.dispatch(new tableActions.updateRowsCount(count));
  }

  updateSort(field: string) {
    this.store.dispatch(new tableActions.setSortValue(field));
  }
}

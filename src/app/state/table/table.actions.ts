import { Action } from "@ngrx/store";
import { Table, Column } from "./table.model";

export const ADD_COLUMN = "[Table] Add Column";
export const REMOVE_COLUMN = "[Table] Remove Column";

export const UPDATE_TABLE_DATA = "[Table] Update Data";

export const GET_FIRST_PAGE = "[Table] Get First Page";
export const GET_LAST_PAGE = "[Table] Get Last Page";
export const GET_NEXT_PAGE = "[Table] Get Next Page";
export const GET_PREV_PAGE = "[Table] Get Previous Page";
export const UPDATE_ROWS_COUNT = "[Table] Update Rows Per Page";

export const SET_SORT_VALUE = "[Table] Set Sort Value";

export class AddColumn implements Action {
  readonly type = ADD_COLUMN;
  constructor(public payload: Column) {}
}

export class removeColumn implements Action {
  readonly type = REMOVE_COLUMN;
  constructor(public payload: Column) {}
}

export class updateTableData implements Action {
  readonly type = UPDATE_TABLE_DATA;
  constructor(public payload: any[]) {}
}

export class getFirstPage implements Action {
  readonly type = GET_FIRST_PAGE;
}

export class getLastPage implements Action {
  readonly type = GET_LAST_PAGE;
}

export class getNextPage implements Action {
  readonly type = GET_NEXT_PAGE;
}

export class getPreviousPage implements Action {
  readonly type = GET_PREV_PAGE;
}

export class updateRowsCount implements Action {
  readonly type = UPDATE_ROWS_COUNT;
  constructor(public payload: number) {}
}

export class setSortValue implements Action {
  readonly type = SET_SORT_VALUE;
  constructor(public payload: string) {}
}

export type All =
  | AddColumn
  | removeColumn
  | updateTableData
  | getFirstPage
  | getLastPage
  | getNextPage
  | getPreviousPage
  | updateRowsCount
  | setSortValue;

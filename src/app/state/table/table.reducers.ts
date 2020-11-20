import * as TableActions from "./table.actions";
import { Table } from "./table.model";

export type Action = TableActions.All;

const initialState: Table = {
  columns: [
    "rank",
    "name",
    "daysTrending",
    "averageRanking",
    "presenceRate",
    "top",
    "trend",
  ],
  data: [],
  pagination: {
    page: 0,
    pages: 0,
    rowsPerPage: 20,
  },
  sort: {
    orderBy: "rank",
    order: 1,
  },
};

export function tableReducer(state: Table = initialState, action: Action) {
  switch (action.type) {
    case TableActions.TOGGLE_COLUMN:
      const columnIndex = state.columns.indexOf(action.payload);
      if (columnIndex !== -1) {
        //remove column
        return {
          ...state,
          columns: [
            ...state.columns.slice(0, columnIndex),
            ...state.columns.slice(columnIndex + 1, state.columns.length),
          ],
        };
      }
      //add column
      return {
        ...state,
        columns: [...state.columns, action.payload],
      };

    case TableActions.UPDATE_TABLE_DATA:
      return {
        ...state,
        data: action.payload,
        pagination: {
          ...state.pagination,
          page: 0,
        },
      };
    case TableActions.GET_FIRST_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: 0,
        },
      };
    case TableActions.GET_LAST_PAGE:
      const lastPage = Math.ceil(
        state.data.length / state.pagination.rowsPerPage
      );
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: lastPage,
        },
      };
    case TableActions.GET_NEXT_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: state.pagination.page + 1,
        },
      };
    case TableActions.GET_PREV_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: state.pagination.page - 1,
        },
      };

    case TableActions.UPDATE_ROWS_COUNT:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          rowsPerPage: action.payload,
        },
      };
    case TableActions.SET_SORT_VALUE:
      return {
        ...state,
        sort: {
          orderBy: action.payload,
          order:
            state.sort.orderBy === action.payload ? state.sort.order * -1 : 1,
        },
      };

    default:
      return state;
  }
}

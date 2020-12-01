import * as TableActions from "./table.actions";
import { Table, Pagination } from "./table.model";

export type Action = TableActions.All;

/**
 * Sort active columns to keep consistency in table
 * @param stateColumns array of active columns
 */
function sortColumns(stateColumns) {
  const columns = initialState.columns;

  //build index array of state columns
  let indexArray = stateColumns.map((val) => columns.indexOf(val));

  //sort index Array
  indexArray.sort((a, b) => a - b);

  //get column values
  let sortedColumns = indexArray.map((index) => columns[index]);

  return sortedColumns;
}

function compareFunction(a, b, order) {
  const isString = typeof a === "string";
  let firstValue = a,
    secondValue = b;

  if (isString) {
    firstValue = firstValue.toUpperCase();
    secondValue = secondValue.toUpperCase();
  }

  let comparison = 0;

  if (firstValue > secondValue) {
    comparison = 1;
  } else if (secondValue > firstValue) {
    comparison = -1;
  }

  //order is 1 for asc and -1 for desc
  return comparison * order;
}

function sortTableData(data: any[], sortObject) {
  let clonedData = [...data];
  const getTrendSort = (ranks: number[]) => {
    const difference = ranks[0] - ranks[ranks.length - 1];
    if (difference > 0) return 0;
    if (difference === 0) return 1;
    if (difference < 0) {
      return 2;
    }
  };
  let sortFunc = null;
  switch (sortObject.orderBy) {
    case "rank":
      sortFunc = (a, b) =>
        compareFunction(a.currentRank, b.currentRank, sortObject.order);
      break;
    case "name":
      sortFunc = (a, b) => compareFunction(a.Name, b.Name, sortObject.order);
      break;
    case "daysTrending":
      sortFunc = (a, b) =>
        compareFunction(a.dates.length, b.dates.length, sortObject.order);
      break;
    case "averageRanking":
      sortFunc = (a, b) =>
        compareFunction(a.averageRank, b.averageRank, sortObject.order);
      break;
    case "presenceRate":
      sortFunc = (a, b) =>
        compareFunction(a.presenceRate, b.presenceRate, sortObject.order);
      break;
    case "top":
      sortFunc = (a, b) => compareFunction(a.peek, b.peek, sortObject.order);
      break;
    case "trend":
      sortFunc = (a, b) =>
        compareFunction(
          getTrendSort(a.ranks),
          getTrendSort(b.ranks),
          sortObject.order
        );
      break;
    default:
      break;
  }
  return sortFunc ? clonedData.sort(sortFunc) : data;
}

function generateInitialPagination(
  dataLength: number,
  oldPagination: Pagination
): Pagination {
  return {
    ...oldPagination,
    page: 1,
    pages: Math.ceil(dataLength / oldPagination.rowsPerPage),
    totalRows: dataLength,
  };
}

function generatePaginatedData(data: any[], pagination: Pagination) {
  const { page, rowsPerPage } = pagination;

  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
}

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
    rowsPerPage: 10,
    totalRows: 0,
  },
  sort: {
    orderBy: "rank",
    order: 1,
  },
  tableData: [],
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
        columns: sortColumns([...state.columns, action.payload]),
      };

    case TableActions.UPDATE_TABLE_DATA:
      const initialPagination = generateInitialPagination(
        action.payload.length,
        state.pagination
      );
      return {
        ...state,
        data: action.payload,
        pagination: initialPagination,
        tableData: generatePaginatedData(
          sortTableData(action.payload, state.sort),
          initialPagination
        ),
        sort: initialState.sort,
      };
    case TableActions.GET_NEXT_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page:
            state.pagination.page + 1 <= state.pagination.pages
              ? state.pagination.page + 1
              : state.pagination.page,
        },
        tableData: generatePaginatedData(
          sortTableData(state.data, state.sort),
          {
            ...state.pagination,
            page:
              state.pagination.page + 1 <= state.pagination.pages
                ? state.pagination.page + 1
                : state.pagination.page,
          }
        ),
      };
    case TableActions.GET_PREV_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page:
            state.pagination.page - 1 >= 1
              ? state.pagination.page - 1
              : state.pagination.page,
        },
        tableData: generatePaginatedData(
          sortTableData(state.data, state.sort),
          {
            ...state.pagination,
            page:
              state.pagination.page - 1 >= 1
                ? state.pagination.page - 1
                : state.pagination.page,
          }
        ),
      };
    case TableActions.GET_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload,
        },
        tableData: generatePaginatedData(
          sortTableData(state.data, state.sort),
          {
            ...state.pagination,
            page: action.payload,
          }
        ),
      };

    case TableActions.UPDATE_ROWS_COUNT:
      const rowPagination = generateInitialPagination(state.data.length, {
        ...state.pagination,
        rowsPerPage: action.payload,
      });
      return {
        ...state,
        pagination: rowPagination,
        tableData: generatePaginatedData(
          sortTableData(state.data, state.sort),
          rowPagination
        ),
      };
    case TableActions.SET_SORT_VALUE:
      const newPagination = generateInitialPagination(
        state.data.length,
        state.pagination
      );
      const newSort = {
        orderBy: action.payload,
        order:
          state.sort.orderBy === action.payload ? state.sort.order * -1 : 1,
      };
      return {
        ...state,
        sort: newSort,
        pagination: newPagination,
        tableData: generatePaginatedData(
          sortTableData(state.data, newSort),
          newPagination
        ),
      };

    default:
      return state;
  }
}

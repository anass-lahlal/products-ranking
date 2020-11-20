export interface Table {
  columns: Column[];
  data: [];
  pagination: Pagination;
  sort: Sort;
}

const columns = [
  "rank",
  "name",
  "top",
  "averageRanking",
  "presenceRate",
  "trend",
  "daysTrending",
] as const;

export type Column = typeof columns[number];

export interface Pagination {
  page: number;
  pages: number;
  rowsPerPage: number;
}

export interface Sort {
  orderBy: string;
  order: 1 | -1;
}

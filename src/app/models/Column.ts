export interface TableColumn {
  title: string;
  accessor: string;
  maxWidth?: number;
  minWidth?: number;
  background?: number;
  sortable?: boolean;
}

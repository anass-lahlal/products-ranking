export interface Table {
  rows: {}[];
  loading?: boolean;
  className?: string;
  onSort?: sortFunc;
}

interface sortFunc {
  (field: string): void;
}

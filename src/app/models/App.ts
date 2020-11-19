import { Categories } from "../state/categories/categories.model";
import { Table } from "../state/table/table.model";

export interface AppState {
  category: Categories;
  table: Table;
}

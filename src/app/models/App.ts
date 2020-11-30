import { Categories } from "../state/categories/categories.model";
import { Table } from "../state/table/table.model";
import { Graph } from "../state/graph/graph.model";
import { Filter } from "../state/filter/filter.model";

export interface AppState {
  category: Categories;
  table: Table;
  graph: Graph;
  filter: Filter;
}

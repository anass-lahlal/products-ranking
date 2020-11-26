import { Action } from "@ngrx/store";
import { Line } from "./graph.model";

export const UPDATE_GRAPH_DATA = "[Graph] Update Data";

export class updateGraphData implements Action {
  readonly type = UPDATE_GRAPH_DATA;

  constructor(public payload: Line[]) {}
}

export type All = updateGraphData;

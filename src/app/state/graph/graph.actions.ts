import { Action } from "@ngrx/store";
import { Line, GraphData, GraphRange } from "./graph.model";

export const UPDATE_GRAPH_DATA = "[Graph] Update Data";

export class updateGraphData implements Action {
  readonly type = UPDATE_GRAPH_DATA;

  constructor(public payload: GraphData, public range: GraphRange) {}
}

export type All = updateGraphData;

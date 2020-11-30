import * as GraphActions from "./graph.actions";
import { Graph } from "./graph.model";

export type Action = GraphActions.All;

const initialState: Graph = {
  data: [],
};

export function graphReducer(state = initialState, action: Action) {
  switch (action.type) {
    case GraphActions.UPDATE_GRAPH_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}

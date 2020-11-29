import * as GraphActions from "./graph.actions";
import { Graph } from "./graph.model";

export type Action = GraphActions.All;

const initialState: Graph = {
  data: [],
  range: {
    min: 0,
    max: 0,
  },
};

export function graphReducer(state = initialState, action: Action) {
  switch (action.type) {
    case GraphActions.UPDATE_GRAPH_DATA:
      return {
        ...state,
        data: action.payload,
        range: action.range,
      };
    default:
      return state;
  }
}

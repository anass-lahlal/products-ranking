import * as GraphActions from "./graph.actions";

export type Action = GraphActions.All;

const initialState = {
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

import {
  ChangeCategory,
  CHANGE_CATEGORY,
} from "../categories/categoris.actions";
import * as FilterActions from "./filter.actions";
import { Filter } from "./filter.model";

export type Action = FilterActions.All | ChangeCategory;

const initialState: Filter = {
  min: null,
  max: null,
  date: null,
};

export function filterReducer(state = initialState, action: Action) {
  switch (action.type) {
    case FilterActions.FILTER_UPDATE_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case FilterActions.FILTER_UPDATE_MIN_RANGE:
      return {
        ...state,
        min: action.payload,
      };
    case FilterActions.FILTER_UPDATE_MAX_RANGE:
      return {
        ...state,
        max: action.payload,
      };
    case CHANGE_CATEGORY:
      return initialState;
    default:
      return state;
  }
}

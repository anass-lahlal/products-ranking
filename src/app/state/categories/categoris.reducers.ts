import * as CategoriesAction from "./categoris.actions";
import { Categories } from "./categories.model";
import { Category } from "../../labels/category";

export type Action = CategoriesAction.All;

//initial state
const initialState = Category.Furniture;

export function categoriesReducer(
  state: Categories = initialState,
  action: Action
) {
  switch (action.type) {
    case CategoriesAction.CHANGE_CATEGORY:
      return action.payload;
    default:
      return state;
  }
}

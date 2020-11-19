import { Action } from "@ngrx/store";
import { Categories } from "./categories.model";

export const CHANGE_CATEGORY = "[Category] Change";

export class ChangeCategory implements Action {
  readonly type = CHANGE_CATEGORY;
  constructor(public payload: Categories) {}
}

export type All = ChangeCategory;

import { Action } from "@ngrx/store";

export const FILTER_UPDATE_DATE = "[Filter] Update Date";
export const FILTER_UPDATE_MIN_RANGE = "[Filter] Update Minimum Range";
export const FILTER_UPDATE_MAX_RANGE = "[Filter] Update Maximum Range";

export class updateDate implements Action {
  readonly type = FILTER_UPDATE_DATE;

  constructor(public payload: Date) {}
}

export class updateMinRange implements Action {
  readonly type = FILTER_UPDATE_MIN_RANGE;

  constructor(public payload: Date) {}
}

export class updateMaxRange implements Action {
  readonly type = FILTER_UPDATE_MAX_RANGE;

  constructor(public payload: Date) {}
}

export type All = updateDate | updateMinRange | updateMaxRange;

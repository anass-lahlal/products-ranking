import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../models/App";
import * as filterActions from "../state/filter/filter.actions";
import { Filter } from "../state/filter/filter.model";

@Injectable({
  providedIn: "root",
})
export class FilterService {
  constructor(private store: Store<AppState>) {}

  getDateFilter(): Observable<Filter> {
    return this.store.select((state) => state.filter);
  }

  setFilterDate(date: Date) {
    this.store.dispatch(new filterActions.updateDate(date));
  }

  setFilterDateMinRange(date: Date) {
    this.store.dispatch(new filterActions.updateMinRange(date));
  }

  setFilterDateMaxRange(date: Date) {
    this.store.dispatch(new filterActions.updateMaxRange(date));
  }
}

import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../models/App";
import { Graph, Line, Point } from "../state/graph/graph.model";
import * as graphActions from "../state/graph/graph.actions";

@Injectable({
  providedIn: "root",
})
export class GraphService {
  constructor(private store: Store<AppState>) {}

  getGraphData(): Observable<Line[]> {
    return this.store.select((state) => state.graph.data);
  }

  updateGraphData(data: Line[]) {
    this.store.dispatch(new graphActions.updateGraphData(data));
  }
}

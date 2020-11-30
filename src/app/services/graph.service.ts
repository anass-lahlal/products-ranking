import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../models/App";
import { Graph, GraphData, GraphRange } from "../state/graph/graph.model";
import * as graphActions from "../state/graph/graph.actions";

@Injectable({
  providedIn: "root",
})
export class GraphService {
  constructor(private store: Store<AppState>) {}

  getGraphData(): Observable<Graph> {
    return this.store.select((state) => state.graph);
  }

  updateGraphData(data: GraphData) {
    this.store.dispatch(new graphActions.updateGraphData(data));
  }
}

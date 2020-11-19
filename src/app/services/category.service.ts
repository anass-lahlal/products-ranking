import { Injectable } from "@angular/core";
import { Category } from "../labels/category";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../models/App";
import * as categoryActions from "../state/categories/categoris.actions";
import { Categories } from "../state/categories/categories.model";
import * as furniture from "../../assets/JSON/furniture.json";
import * as bedroom from "../../assets/JSON/bedroom-furniture.json";
import * as mattresses from "../../assets/JSON/mattresses.json";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private store: Store<AppState>) {}

  getCategoryData(category: string): any {
    switch (category) {
      case Category.Furniture:
        return furniture;
      case Category.Mattresses:
        return mattresses;
      case Category.Bedroom:
        return bedroom;
      default:
        return [];
    }
  }

  getCategory(): Observable<Categories> {
    return this.store.select((state) => state.category);
  }

  setCategory(category: Categories) {
    this.store.dispatch(new categoryActions.ChangeCategory(category));
  }
}

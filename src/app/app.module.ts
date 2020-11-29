import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ChartModule } from "angular-highcharts";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TableComponent } from "./components/table/table.component";
import { RowComponent } from "./components/row/row.component";
import { FilterComponent } from "./components/filter/filter.component";
import { GraphComponent } from "./components/graph/graph.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { GraphHeaderComponent } from "./components/graph-header/graph-header.component";
import { CardComponent } from "./components/card/card.component";
import { StoreModule } from "@ngrx/store";

import { categoriesReducer } from "./state/categories/categoris.reducers";
import { tableReducer } from "./state/table/table.reducers";
import { TableService } from "./services/table.service";
import { CategoryService } from "./services/category.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { graphReducer } from "./state/graph/graph.reducers";

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    RowComponent,
    FilterComponent,
    GraphComponent,
    CategoriesComponent,
    GraphHeaderComponent,
    CardComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      category: categoriesReducer,
      table: tableReducer,
      graph: graphReducer,
    }),
    FontAwesomeModule,
    ChartModule,
  ],
  providers: [TableService, CategoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ChartModule } from "angular-highcharts";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TableComponent } from "./components/table/table.component";
import { FilterComponent } from "./components/filter/filter.component";
import { GraphComponent } from "./components/graph/graph.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { StoreModule } from "@ngrx/store";

import { categoriesReducer } from "./state/categories/categoris.reducers";
import { tableReducer } from "./state/table/table.reducers";
import { TableService } from "./services/table.service";
import { CategoryService } from "./services/category.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { graphReducer } from "./state/graph/graph.reducers";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { filterReducer } from "./state/filter/filter.reducers";
import { BarChartComponent } from "./components/bar-chart/bar-chart.component";
import { TrendListComponent } from "./components/trend-list/trend-list.component";

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FilterComponent,
    GraphComponent,
    CategoriesComponent,
    PaginationComponent,
    BarChartComponent,
    TrendListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      category: categoriesReducer,
      table: tableReducer,
      graph: graphReducer,
      filter: filterReducer,
    }),
    FontAwesomeModule,
    ChartModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  providers: [TableService, CategoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}

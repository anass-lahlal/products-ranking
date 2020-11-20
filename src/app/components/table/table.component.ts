import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { ColumnTitles, ColumnsArray } from "src/app/labels/TableLabels";
import { TableService } from "src/app/services/table.service";
import { Column, Sort } from "src/app/state/table/table.model";
import { TableColumn } from "../../models/Column";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent {
  columnFilterArray$: Observable<Column[]>;
  sortObject$: Observable<Sort>;
  tableColumns: TableColumn[];
  allColumns = ColumnsArray;

  constructor(private tableService: TableService) {
    this.columnFilterArray$ = tableService.getColumns();
    this.sortObject$ = tableService.getSort();

    this.columnFilterArray$.subscribe((columns) =>
      this.generateColumns(columns)
    );
  }

  generateColumns(columns: Column[]) {
    let cols = [];
    const nonSortableColumns: Column[] = ["trend"];
    for (let i = 0; i < columns.length; i++) {
      const col = columns[i];
      let colProperties = {};
      colProperties["accessor"] = col;
      colProperties["title"] = ColumnTitles[col];
      let sortable = false;
      if (nonSortableColumns.indexOf(col) === -1) sortable = true;
      colProperties["sortable"] = sortable;
      cols.push(colProperties);
    }

    console.log(cols);

    this.tableColumns = cols;
  }

  toggleColumn(col: Column) {
    this.tableService.toggleColumn(col);
  }

  onSort(col: Column) {
    this.tableService.updateSort(col);
  }
}

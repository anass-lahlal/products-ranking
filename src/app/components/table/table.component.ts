import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { ColumnsArray, ColumnConfig } from "src/app/labels/TableLabels";
import { TableService } from "src/app/services/table.service";
import { Column, Sort, Pagination } from "src/app/state/table/table.model";
import { TableColumn } from "../../models/Column";
import { reverse } from "lodash";
import {
  faSort,
  faSortUp,
  faSortDown,
  faPlus,
  faTimes,
  faArrowUp,
  faArrowDown,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css", "../../app.component.css"],
})
export class TableComponent {
  faSort = faSort;
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  faPlus = faPlus;
  faTimes = faTimes;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faMinus = faMinus;

  columnFilterArray$: Observable<Column[]>;
  sortObject$: Observable<Sort>;
  tableData$: Observable<any[]>;
  tableColumns: TableColumn[];
  allColumns = ColumnsArray;

  constructor(private tableService: TableService) {
    this.columnFilterArray$ = tableService.getColumns();
    this.sortObject$ = tableService.getSort();
    this.tableData$ = tableService.getTableData();

    this.columnFilterArray$.subscribe((columns) =>
      this.generateColumns(columns)
    );
  }

  generateColumns(columns: Column[]) {
    let cols = [];
    for (let i = 0; i < columns.length; i++) {
      const col = columns[i];
      let colProperties = ColumnConfig.find((o) => o.accessor === col);
      cols.push(colProperties);
    }

    this.tableColumns = cols;
  }

  getRankIcon(ranks) {
    if (ranks[0] < ranks[1]) return faArrowUp;
    if (ranks[0] > ranks[1]) return faArrowDown;
    return faMinus;
  }

  getRankIconClass(ranks: number[]) {
    return {
      "table-cell-rank-icon": true,
      "table-cell-rank-icon--up": ranks.length > 1 && ranks[1] > ranks[0],
      "table-cell-rank-icon--down": ranks.length > 1 && ranks[1] < ranks[0],
    };
  }

  getTableHeadStyles(column: TableColumn) {
    let styles = {};
    if (column.minWidth) styles["min-width"] = column.minWidth + "px";
    if (column.maxWidth) styles["max-width"] = column.maxWidth + "px";

    return styles;
  }

  floorValue(value: number) {
    return Math.floor(value);
  }

  roundValue(value: number) {
    return Math.round(value);
  }

  generateTrendGraph(ranks: number[]) {
    const svgHeight = 80;
    const svgWidth = 140;
    const totalPoints = Math.max(ranks.length, 2); // when we have a single point, we'll need another one to draw a path
    const offset = 20; //offset from top and bottom
    const minRank = 0;
    const maxRank = 100;
    const xStep = (svgWidth - 2 * offset) / (totalPoints - 1);
    const graphRange = [svgHeight / 2 - offset, svgHeight / 2 + offset];

    const scale = (num, in_min, in_max, out_min, out_max) => {
      return (
        ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
      );
    };

    //map values to available height width offset
    let mapedValues = reverse([...ranks]).map((val) =>
      Math.ceil(scale(val, minRank, maxRank, graphRange[0], graphRange[1]))
    );

    if (mapedValues.length === 1)
      mapedValues = [...mapedValues, ...mapedValues];

    let pathData = "M";
    for (let i = 0; i < mapedValues.length; i++) {
      const y = mapedValues[i];
      const x = Math.ceil(i * xStep + offset);
      if (i > 0) pathData += " L";
      pathData += x + "," + y;
    }

    return pathData;
  }

  getPathState(ranks: number[]) {
    const first = ranks[0];
    const last = ranks[ranks.length - 1];
    if (first > last) return "decrease";
    if (last > first) return "increase";
    return "stable";
  }

  getViewBox() {
    return "0 0 140 80";
  }

  getTruncateName(name: string) {
    const maxTextLength = 50;
    if (name.length > maxTextLength) {
      return name.substring(0, maxTextLength) + "...";
    }
    return name;
  }

  toggleColumn(col: Column) {
    this.tableService.toggleColumn(col);
  }

  onSort(col: Column) {
    this.tableService.updateSort(col);
  }
}

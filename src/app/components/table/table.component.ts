import { Component, OnInit, Input } from "@angular/core";
import { Column } from "src/app/models/Column";
import { Row } from "src/app/models/Row";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  @Input() rows: Row[];
  @Input() columns: Column[];

  constructor() {}

  ngOnInit(): void {}
}

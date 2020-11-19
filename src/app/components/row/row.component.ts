import { Component, OnInit, Input } from "@angular/core";
import { Row } from "../../models/Row";

@Component({
  selector: "app-row",
  templateUrl: "./row.component.html",
  styleUrls: ["./row.component.css"],
})
export class RowComponent implements OnInit {
  @Input() data: Row;

  constructor() {}

  ngOnInit(): void {}
}

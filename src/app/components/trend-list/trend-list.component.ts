import { Component, Input } from "@angular/core";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-trend-list",
  templateUrl: "./trend-list.component.html",
  styleUrls: ["./trend-list.component.css", "../../app.component.css"],
})
export class TrendListComponent {
  @Input() title: string;
  @Input() products: any[];

  faArrowDown = faArrowDown;

  constructor() {}
}

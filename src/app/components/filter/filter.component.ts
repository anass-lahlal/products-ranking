import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Filter } from "src/app/state/filter/filter.model";
import { FilterService } from "src/app/services/filter.service";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css", "../../app.component.css"],
})
export class FilterComponent {
  dateFilter$: Observable<Filter>;
  faCalendar = faCalendar;
  constructor(private filterService: FilterService) {
    this.dateFilter$ = filterService.getDateFilter();
  }

  onDateChange(date: Date) {
    this.filterService.setFilterDate(date);
  }
}

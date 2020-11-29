import { Component } from "@angular/core";
import { Chart } from "angular-highcharts";
import { map } from "lodash";

import { GraphData, GraphRange } from "../../state/graph/graph.model";
import { GraphService } from "../../services/graph.service";

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.css", "../../app.component.css"],
})
export class GraphComponent {
  chart: Chart;

  constructor(private graphService: GraphService) {
    graphService
      .getGraphData()
      .subscribe((state) => this.updateChart(state.data, state.range));
  }

  updateChart(data: GraphData, range: GraphRange): void {
    this.chart = new Chart({
      chart: {
        type: "line",
      },
      title: {
        text: "",
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      series: map(data, (value) => ({
        name: value.name,
        data: <number[][]>value.points,
        type: "line",
      })),
      yAxis: {
        reversed: true,
        min: 1,
        max: 100,
        title: {
          text: "Rank",
        },
      },
      xAxis: {
        type: "datetime",
        min: range.min,
        max: range.max,
      },
      tooltip: {
        xDateFormat: "%m/%d/%Y",
        className: "graph-tooltip",
      },
      plotOptions: {
        line: {
          marker: {
            enabled: false,
          },
        },
      },
    });
  }
}

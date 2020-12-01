import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Chart } from "angular-highcharts";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css", "../../app.component.css"],
})
export class BarChartComponent implements OnChanges {
  @Input() data: number[] = [0, 0];
  chart: Chart;

  constructor() {
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateChart();
  }

  updateChart() {
    this.chart = new Chart({
      chart: {
        type: "column",
      },
      title: {
        text: "",
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "top",
        x: -10,
        y: 10,
        floating: true,
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
        shadow: true,
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        visible: false,
      },
      yAxis: {
        min: 0,
        title: {
          text: "Number of Products",
          align: "high",
        },
        labels: {
          overflow: "justify",
        },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      tooltip: {
        headerFormat: "",
      },
      series: [
        {
          name: "new",
          data: [this.data[1]],
          type: "column",
        },
        {
          name: "left",
          data: [this.data[0]],
          type: "column",
        },
      ],
    });
  }
}

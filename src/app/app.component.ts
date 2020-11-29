import { Component } from "@angular/core";
import { times, map } from "lodash";

import { Product } from "./models/Product";
import { CategoryService } from "./services/category.service";
import { GraphService } from "./services/graph.service";
import { TableService } from "./services/table.service";
import { Line } from "./state/graph/graph.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(
    private categoryService: CategoryService,
    private tableService: TableService,
    private graphService: GraphService
  ) {
    categoryService.getCategory().subscribe((data) => this.getData(data));
  }

  getData(category) {
    let data = this.categoryService.getCategoryData(category).default;

    this.buildData(data);
  }

  appendPoint(line: Line[], dates: string[], rank: number, date: string) {
    if (line.length === 0) return [...line, rank];

    //compare last day in array with current and append nulls for each day
    const lastRankedDay = new Date(dates[dates.length - 1]).getTime();
    const currentDayRank = new Date(date).getTime();
    const differenceTime = Math.abs(currentDayRank - lastRankedDay);
    const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
    const missingDays = differenceDays - 1;

    return [
      [new Date(date).getTime(), rank],
      ...times(missingDays, () => [null, null]),
      ...line,
    ];
  }

  buildData(data: Product[]) {
    let uniqueProducts = {};
    let graphData = {};
    let transformedData = [];
    const presenceRateRankThreshold = 10;
    const graphRateThreshold = 20;
    // since data is sorted, we can get the last day's rank from the first product
    //in a real example, we would use current date
    const currentDay = data[0]?.Date;

    //construct object of unique products with their corresponding data
    for (let i = 0; i < data.length; i++) {
      const product = data[i];
      if (uniqueProducts[product.ASIN]) {
        graphData[product.ASIN] = {
          ...graphData[product.ASIN],
          points: this.appendPoint(
            graphData[product.ASIN].points,
            uniqueProducts[product.ASIN].dates,
            product.Rank,
            product.Date
          ),
          isTopRanking:
            graphData[product.ASIN].isTopRanking ||
            (product.Rank <= graphRateThreshold && product.Date === currentDay),
        };

        uniqueProducts[product.ASIN] = {
          ...uniqueProducts[product.ASIN],
          ranks: [...uniqueProducts[product.ASIN].ranks, product.Rank],
          dates: [...uniqueProducts[product.ASIN].dates, product.Date],
        };
      } else {
        let emptyArray = new Array();
        uniqueProducts[product.ASIN] = {
          name: product.Name,
          ranks: [...emptyArray, product.Rank],
          dates: [...emptyArray, product.Date],
        };

        if (product.Date === currentDay)
          uniqueProducts[product.ASIN]["currentRank"] = product.Rank;

        graphData[product.ASIN] = {
          name: product.Name,
          points: [
            ...emptyArray,
            [new Date(product.Date).getTime(), product.Rank],
          ],
          isTopRanking:
            product.Rank <= graphRateThreshold && product.Date === currentDay,
        };
      }
    }

    //build row data
    const keys = Object.keys(uniqueProducts);
    for (let i = 0; i < keys.length; i++) {
      const productData = uniqueProducts[keys[i]];
      const totalRanking = productData.ranks.reduce(
        (total, val) => (total += val),
        0
      );
      const top10Days = productData.ranks.filter(
        (rank) => rank <= presenceRateRankThreshold
      ).length;
      let averageRank = totalRanking / productData.ranks.length;

      if (productData.currentRank)
        //push data to new array
        transformedData.push({
          ASIN: keys[i],
          Name: productData.name,
          averageRank,
          presenceRate: (top10Days / 30) * 100,
          peek: Math.min(...productData.ranks),
          rankCount: productData.ranks.length,
          currentRank: productData.currentRank,
          isNew:
            productData.ranks.length === 1 &&
            productData.dates[0] === currentDay,
          ranks: productData.ranks,
          dates: productData.dates,
        });
    }

    //filter graph data

    let filteredGraphData = map(
      graphData,
      ({ isTopRanking, points, name }, key) =>
        isTopRanking && { name, points, id: key }
    ).filter((value) => !!value);

    const max = new Date(data[0].Date).getTime();
    const min = new Date(data[data.length - 1].Date).getTime();

    //update store's table data
    this.tableService.updateTableData(transformedData);

    //update store's graph data
    this.graphService.updateGraphData(filteredGraphData, { min, max });
  }
}

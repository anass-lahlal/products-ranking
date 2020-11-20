import { Component } from "@angular/core";
import { Product } from "./models/Product";
import { CategoryService } from "./services/category.service";
import { TableService } from "./services/table.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(
    private categoryService: CategoryService,
    private tableService: TableService
  ) {
    categoryService
      .getCategory()
      .subscribe((category) => this.getData(category));
  }

  getData(category) {
    let data = this.categoryService.getCategoryData(category).default;

    this.buildData(data);
  }

  buildData(data: Product[]) {
    let uniqueProducts = {};
    let transformedData = [];
    const presenceRateRankThreshold = 10;
    // since data is sorted, we can get the last day's rank from the first product
    //in a real example, we would use current date
    const currentDay = data[0]?.Date;

    //construct object of unique products with their corresponding data
    for (let i = 0; i < data.length; i++) {
      const product = data[i];
      if (uniqueProducts[product.ASIN]) {
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
          currentRank: product.Date === currentDay ? product.Rank : 0,
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
      //push data to new array
      transformedData.push({
        ASIN: keys[i],
        Name: productData.name,
        averageRank,
        presenceRate: (top10Days / 30) * 100,
        peek: Math.max(...productData.ranks),
        rankCount: productData.ranks.length,
        currentRank: productData.currentRank,
        isNew:
          productData.ranks.length === 1 && productData.dates[0] === currentDay,
        ranks: productData.ranks,
        dates: productData.dates,
      });
    }

    //update store data
    this.tableService.updateTableData(transformedData);
  }
}

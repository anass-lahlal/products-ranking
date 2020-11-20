import { map, invert } from "lodash";

export const ColumnTitles = {
  name: "Name",
  rank: "Rank",
  top: "Peak",
  averageRanking: "Avg. Ranking",
  presenceRate: "Presence Rate(%)",
  trend: "Trend",
  daysTrending: "Days Trending",
};

export const ColumnsArray = [
  {
    title: "Rank",
    value: "rank",
  },
  {
    title: "Name",
    value: "name",
  },
  {
    title: "Peak",
    value: "top",
  },
  {
    title: "Avg. Ranking",
    value: "averageRanking",
  },
  {
    title: "Presence Rate(%)",
    value: "presenceRate",
  },
  {
    title: "Days Trending",
    value: "daysTrending",
  },
  {
    title: "Trend",
    value: "trend",
  },
];

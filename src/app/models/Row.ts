export interface Row {
  ASIN: string;
  Name: string;
  averageRank: number;
  presenceRate: number;
  peek: number;
  rankCount: number;
  currentRank?: number;
  isNew: boolean;
}

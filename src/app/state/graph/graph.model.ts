export interface Graph {
  data: Line[];
}

export interface Line {
  id: string;
  data: Point[][];
}

export interface Point {
  date: string;
  rank: number;
}

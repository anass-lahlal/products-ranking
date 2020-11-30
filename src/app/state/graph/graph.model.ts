export interface Graph {
  data: GraphData;
}

export type GraphData = GraphLineInfo[];

export type Line = number | null[][];

export interface GraphLineInfo {
  name: string;
  points: Line;
  id: string;
}
export interface GraphRange {
  min: number;
  max: number;
}

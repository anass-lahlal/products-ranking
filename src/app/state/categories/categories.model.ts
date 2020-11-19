import { Category } from "../../labels/category";
const categories = [
  Category.Bedroom,
  Category.Furniture,
  Category.Mattresses,
] as const;

export type Categories = typeof categories[number];

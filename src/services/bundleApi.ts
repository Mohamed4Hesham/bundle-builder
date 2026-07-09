import { get } from "./api";
import type { StepType } from "../types/step";
import type { Category } from "../types/category";
import type { Product } from "../types/product";
import type { initialBundle } from "../types/initialBundle";

export const bundleApi = {
  getSteps: () => get<StepType[]>("steps"),

  getCategories: () => get<Category[]>("categories"),

  getProducts: () => get<Product[]>("products"),

  getInitialBundle: () => get<initialBundle>("initialBundle"),
};
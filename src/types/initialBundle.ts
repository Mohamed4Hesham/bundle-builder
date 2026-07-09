import type { SelectedProducts } from "./selectedproducts";
import type { Shipping } from "./shipping";

export interface InitialBundle {
  selections: SelectedProducts[];
  shipping: Shipping;
}
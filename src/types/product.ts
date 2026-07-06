import type { Variant } from "./variant";

export interface Product {
  id: string;

  categoryId: string;

  title: string;

  description: string;

  image: string;

  currentPrice: number;

  compareAtPrice?: number;

  badge?: string;

  variants?: Variant[];

  learnMoreUrl?: string;
}
import type { Variant } from "./variant";

export interface Product {
  id: string;

  categoryId: string;

  title: string;

  description: string;

  image: string;

  activePrice: number;

  compareAtPrice?: number;

  badge?: string;

  variants?: Variant[];

  learnMoreUrl?: string;
}
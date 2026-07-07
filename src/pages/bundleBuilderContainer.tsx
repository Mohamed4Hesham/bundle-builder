import { useEffect, useState } from "react";
import { bundleApi } from "../services/bundleApi";
import type { StepType } from "../types/step";
import type { Product } from "../../../types/product";
import { Builder } from "../components/builder/components/Builder";
import ReviewPanel from "../components/review/components/ReviewPanel";

function BundleBuilderContainer() {
  const [steps, setSteps] = useState<StepType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadSteps = async () => {
      try {
        const data = await bundleApi.getSteps();
        console.log("Fetched steps:", data);
        setSteps(data);
      } catch (error) {
        console.error(error);
      }
    };
    const loadProducts = async () => {
      try {
        const data = await bundleApi.getProducts();
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadSteps();
    loadProducts();
  }, []);

  return (
    <main className="mx-auto max-w-screen-2xl px-6 md:px-10 xl:px-24 py-12">
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <Builder steps={steps} products={products} />
        <ReviewPanel />
      </div>
    </main>
  );
}

export default BundleBuilderContainer;

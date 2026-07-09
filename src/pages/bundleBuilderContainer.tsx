import { useEffect, useState } from "react";
import { bundleApi } from "../services/bundleApi";
import type { StepType } from "../types/step";
import { Builder } from "../components/builder/components/Builder";
import ReviewPanel from "../components/review/components/ReviewPanel";
import type { SelectedProducts } from "../types/selectedproducts";
import type { Product } from "../types/product";
import type { Shipping } from "../types/shipping";

function BundleBuilderContainer() {
  const [steps, setSteps] = useState<StepType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>([]);
  const [shipping, setShipping] = useState<Shipping | null>(null);

  const updateQuantity = (
    productId: string,
    variantId: string,
    delta: number
  ) => {
    setSelectedProducts((previous) => {
      const existing = previous.find(
        (p) =>
          p.productId === productId &&
          p.variantId === variantId
      );

      if (!existing) {
        return delta > 0
          ? [
            ...previous,
            {
              productId,
              variantId,
              quantity: delta,
            },
          ]
          : previous;
      }

      const newQuantity = existing.quantity + delta;

      if (newQuantity <= 0) {
        return previous.filter(
          (p) =>
            !(
              p.productId === productId &&
              p.variantId === variantId
            )
        );
      }

      return previous.map((p) =>
        p.productId === productId &&
          p.variantId === variantId
          ? {
            ...p,
            quantity: newQuantity,
          }
          : p
      );
    });
  };

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
    const loadInitialBundle = async () => {
      try {

            const savedBundle = localStorage.getItem("bundle-builder");

    if (savedBundle) {
      setSelectedProducts(JSON.parse(savedBundle));
      return;
    }
        const { selections, shipping } = await bundleApi.getInitialBundle();
        console.log(shipping, "shipping")

        console.log("Fetched initial bundle:", selections);

        setSelectedProducts(selections);
        setShipping(shipping)
      } catch (error) {
        console.error(error);
      }
    };

    loadSteps();
    loadProducts();
    loadInitialBundle();
  }, []);

  return (
    <main className="mx-auto max-w-screen-2xl px-6 md:px-10 xl:px-24 py-12">
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <Builder
          steps={steps}
          products={products}
          selectedProducts={selectedProducts}
          updateQuantity={updateQuantity}
        />

        <ReviewPanel
          products={products}
          selectedProducts={selectedProducts}
          updateQuantity={updateQuantity}
          shipping={shipping}
        />
      </div>
    </main>
  );
}

export default BundleBuilderContainer;

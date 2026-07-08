import { useEffect, useState } from "react";
import Step from "./Step";
import type { StepType } from "../../../types/step";
import type { Product } from "../../../types/product";
import type { SelectedProducts } from "../../../types/selectedproducts";

interface BuilderProps {
  steps: StepType[];
  products: Product[];
}

export function Builder({ steps, products }: BuilderProps & { products: Product[] }) {
  const [openStepId, setOpenStepId] = useState("step-1");
  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>([]);

  const toggleProduct = (productId: string) => {
    setSelectedProducts((previous) => {
      const existing = previous.find(
        (product) => product.productId === productId
      );

      if (existing) {
        if (existing.quantity === 1) {
          return previous.filter(
            (product) => product.productId !== productId
          );
        }

        return previous.map((product) =>
          product.productId === productId
            ? {
              ...product,
              quantity: product.quantity - 1,
            }
            : product
        );
      }

      return [
        ...previous,
        {
          productId,
          quantity: 1,
        },
      ];
    });
  };


  const increaseQuantity = (productId: string) => {
    setSelectedProducts((previous) => {
      const existing = previous.find(
        (product) => product.productId === productId
      );

      if (!existing) {
        return [
          ...previous,
          {
            productId,
            quantity: 1,
          },
        ];
      }

      return previous.map((product) =>
        product.productId === productId
          ? {
            ...product,
            quantity: product.quantity + 1,
          }
          : product
      );
    });
  };

  const decreaseQuantity = (productId: string) => {
    setSelectedProducts((previous) => {
      const existing = previous.find(
        (product) => product.productId === productId
      );

      if (!existing) return previous;

      if (existing.quantity === 1) {
        return previous.filter(
          (product) => product.productId !== productId
        );
      }

      return previous.map((product) =>
        product.productId === productId
          ? {
            ...product,
            quantity: product.quantity - 1,
          }
          : product
      );
    });
  };
  const getNextStep = (currentStepId: string) => {
    const currentIndex = steps.findIndex(
      (step) => step.id === currentStepId
    );

    return steps[currentIndex + 1];
  };

  const handleNextStep = (currentStepId: string) => {
    const nextStep = getNextStep(currentStepId);

    if (nextStep) {
      setOpenStepId(nextStep.id);
    }
  };


  useEffect(() => {
    console.log("Selected Products:", selectedProducts.length);
  }, [selectedProducts]);



  return (
    <section>
      {steps.map((step) => {
        const nextStep = getNextStep(step.id);

        return (
          <Step
            key={step.id}
            step={step}
            products={products}
            isOpen={openStepId === step.id}
            onToggle={() =>
              setOpenStepId(openStepId === step.id ? "" : step.id)
            }
            onNext={() => handleNextStep(step.id)}
            nextStepTitle={nextStep?.title}
            selectedProducts={selectedProducts}
            onToggleProduct={toggleProduct}
            onIncreaseQuantity={increaseQuantity}
            onDecreaseQuantity={decreaseQuantity}
          />
        );
      })}
    </section>
  );
}

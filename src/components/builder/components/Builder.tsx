import { useEffect, useState } from "react";
import Step from "./Step";
import type { StepType } from "../../../types/step";
import type { Product } from "../../../types/product";
import type { SelectedProducts } from "../../../types/selectedproducts";

interface BuilderProps {
  steps: StepType[];
  products: Product[];
  selectedProducts: SelectedProducts[];
  updateQuantity: (productId: string, selectedVariant: string, deltaNumber: number) => void;
}

export function Builder({ steps, products, selectedProducts, updateQuantity }: BuilderProps & { products: Product[] }) {
  const [openStepId, setOpenStepId] = useState("step-1");

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
            updateQuantity={updateQuantity}
          />
        );
      })}
    </section>
  );
}

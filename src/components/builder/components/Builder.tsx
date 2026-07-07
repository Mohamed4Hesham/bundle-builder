import { useState } from "react";
import type { StepType } from "../../../types/step";
import type { Product } from "../../../types/product";
import Step from "./Step";

interface BuilderProps {
  steps: StepType[];
  products: Product[];
}

export function Builder({ steps, products }: BuilderProps & { products: Product[] }) {
  const [openStepId, setOpenStepId] = useState("step-1");

  return (
    <section>
      {steps.map(step => (
        <Step
        key={step.id}
        step={step}
        products={products}
        isOpen={openStepId === step.id}
        onToggle={() =>
            setOpenStepId(
                openStepId === step.id ? "" : step.id
            )
        }
        />
      ))}
    </section>
  );
}

import { useState } from "react";
import type { StepType } from "../../../types/step";
import Step from "./Step";


interface BuilderProps {
  steps: StepType[];
}

export function Builder({ steps }: BuilderProps) {
  const [openStepId, setOpenStepId] = useState("step-1");

  return (
    <section>
      {steps.map(step => (
        <Step
        key={step.id}
        step={step}
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

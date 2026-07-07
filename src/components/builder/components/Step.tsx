import Accordion from "./Accordion";

interface StepProps {
  step: any;
  isOpen: boolean;
  onToggle: () => void;
}

function Step({ step, isOpen, onToggle }: StepProps) {

  return (
    <>
    <Accordion
      title={step.title}
      icon={step.icon}
      stepOrder={step.order}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <p>Products will go here.</p>
    </Accordion>

    </>
  );
}

export default Step;
interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

function QuantityStepper({
  value,
  onChange,
  min = 1,
  max,
}: QuantityStepperProps) {
  const decrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const increase = () => {
    if (max === undefined || value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center rounded-[10px] border border-[#D9D9D9] overflow-hidden">
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        className="flex h-10 w-10 items-center justify-center text-xl transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        −
      </button>

      <div className="flex h-10 w-12 items-center justify-center border-x border-[#D9D9D9] text-base font-medium">
        {value}
      </div>

      <button
        type="button"
        onClick={increase}
        disabled={max !== undefined && value >= max}
        className="flex h-10 w-10 items-center justify-center text-xl transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}

export default QuantityStepper;
import Accordion from "./Accordion";
import ProductCard from "./ProductCard";
import type { Product } from "../../../types/product";
import type { StepType } from "../../../types/step";
import type { SelectedProducts } from "../../../types/selectedproducts";


interface StepProps {
    step: StepType;
    isOpen: boolean;
    products: Product[];
    onToggle: () => void;
    onNext: () => void;
      nextStepTitle?: string;
    selectedProducts: SelectedProducts[];
    onToggleProduct: (productId: string) => void;
    onIncreaseQuantity: (productId: string) => void;
    onDecreaseQuantity: (productId: string) => void;
}
function Step({
    step,
    isOpen,
    onToggle,
    products,
    selectedProducts,
    onToggleProduct,
    onIncreaseQuantity,
    onDecreaseQuantity,
    onNext,
    nextStepTitle
}: StepProps) {


    const stepProducts = products.filter(
        (product) => product.categoryId === step.categoryId
    );
    const selectedCount = selectedProducts.filter((selected) =>
        stepProducts.some((product) => product.id === selected.productId)
    ).length;
    return (
        <>
            <Accordion
                title={step.title}
                icon={step.icon}
                stepOrder={step.order}
                isOpen={isOpen}
                onToggle={onToggle}
                selectedCount={selectedCount}

            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    {stepProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onSelect={() => onToggleProduct(product.id)}
                            onIncrease={() => onIncreaseQuantity(product.id)}
                            onDecrease={() => onDecreaseQuantity(product.id)}
                            selected={selectedProducts.some(
                                (selected) => selected.productId === product.id
                            )}
                            quantity={
                                selectedProducts.find(
                                    (p) => p.productId === product.id
                                )?.quantity ?? 0
                            }
                        />
                    ))}
                </div>
{isOpen && nextStepTitle && (
  <div className="mt-6 flex justify-center">
    <button
      type="button"
      onClick={onNext}
      className="rounded-[7px] border border-[#4E2FD2] px-6 py-2 text-[18px] font-semibold text-[#4E2FD2]"
    >
      Next: {nextStepTitle}
    </button>
  </div>
)}
            </Accordion>

        </>
    );
}

export default Step;
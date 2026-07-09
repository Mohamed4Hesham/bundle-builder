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
    updateQuantity: (productId: string, selectedVariant: string, deltaNumber: number) => void;
}
function Step({
    step,
    isOpen,
    onToggle,
    products,
    selectedProducts,
    updateQuantity,
    onNext,
    nextStepTitle
}: StepProps) {


    const stepProducts = products.filter(
        (product) => product.categoryId === step.categoryId
    );
    const selectedCount = new Set(
        selectedProducts
            .filter((selected) =>
                stepProducts.some(
                    (product) => product.id === selected.productId
                )
            )
            .map((selected) => selected.productId)
    ).size;


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
                    {stepProducts.map((product) => {
                        const isSelected = selectedProducts.some(
                            (selected) => selected.productId === product.id
                        );

                        return (
                            <ProductCard
                                key={product.id}
                                product={product}
                                selected={isSelected}
                                selectedProducts={selectedProducts}
                                updateQuantity={updateQuantity}
                            />
                        );
                    })}
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
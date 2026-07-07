import Accordion from "./Accordion";
import ProductCard from "./ProductCard";

interface StepProps {
    step: any;
    isOpen: boolean;
    products: any[];
    onToggle: () => void;
}

function Step({ step, isOpen, onToggle, products }: StepProps) {

const stepProducts = products.filter(
    (product) => product.categoryId === step.categoryId
);

    return (
        <>
            <Accordion
                title={step.title}
                icon={step.icon}
                stepOrder={step.order}
                isOpen={isOpen}
                onToggle={onToggle}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {stepProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </Accordion>

        </>
    );
}

export default Step;
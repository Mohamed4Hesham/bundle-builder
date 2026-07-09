import type { Product } from "../../../types/product";

interface ReviewItemProps {
    product: Product & {
        quantity: number;
        variantId?: string;
    };
    quantity: number;
    updateQuantity: (productId: string, selectedVariant: string, deltaNumber: number) => void;
}

function ReviewItem({
    product,
    quantity,
    updateQuantity
}: ReviewItemProps) {
    const lineTotal = product.activePrice * quantity;
    const selectedVariant = product.variants?.find(
        (variant) => variant.id === product.variantId
    );

    const imageSrc = selectedVariant
        ? selectedVariant.image
        : product.image;
    return (
        <article className="flex gap-4 border-b border-[#E7E7E7] pb-4">

            {/* Product Image */}

            <div className="h-20 w-20 shrink-0 rounded-md border border-[#E5E5E5] bg-white p-2">
                <img
                    src={imageSrc}
                    alt={product.title}
                    className="h-full w-full object-contain"
                />
            </div>

            {/* Content */}

            <div className="flex flex-1 flex-col">

                <div className="flex items-start justify-between">

                    <div>

                        <h4 className="text-[16px] font-semibold text-[#1F1F1F]">
                            {product.title}
                        </h4>

                        {product.variantId && (
                            <p className="mt-1 text-[12px] text-[#808080]">
                                {product.variantId}
                            </p>
                        )}

                    </div>

                    <button
                        type="button"
                        className="text-[18px] text-[#B0B0B0] transition-colors hover:text-red-500"
                    >
                        ×
                    </button>

                </div>

                <div className="mt-4 flex items-center justify-between">

                    {/* Quantity */}

                    <div className="flex items-center">

                        <button
                            onClick={() => updateQuantity(
                                product.id,
                                product.variantId ?? "",
                                -1
                            )}
                            className="cursor-pointer"
                        >
                            <img
                                src="/Minus.svg"
                                alt="Decrease quantity"
                                className="h-5 w-5"
                            />
                        </button>

                        <span className="mx-3 w-4 text-center">
                            {quantity}
                        </span>

                        <button
                            onClick={() => updateQuantity(product.id, product.variantId ?? "", 1)}

                            className="cursor-pointer"
                        >
                            <img
                                src="/Plus.svg"
                                alt="Increase quantity"
                                className="h-5 w-5"
                            />
                        </button>

                    </div>

                    {/* Line Total */}

                    <div className="text-right">

                        {product.compareAtPrice && (
                            <div className="text-[13px] text-[#D8392B] line-through">
                                $
                                {(
                                    product.compareAtPrice *
                                    quantity
                                ).toFixed(2)}
                            </div>
                        )}

                        <div className="text-[18px] font-semibold text-[#1F1F1F]">
                            ${lineTotal.toFixed(2)}
                        </div>

                    </div>

                </div>

            </div>

        </article>
    );
}

export default ReviewItem;
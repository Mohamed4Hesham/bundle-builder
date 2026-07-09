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

    const isPlan = product.categoryId === "plan"; if (isPlan) {
        return (
            <article className="flex items-center justify-between pb-3">

                <div className="flex items-center ">
                    <img
                        src={imageSrc}
                        alt={product.title}
                        className="h-10 w-10"
                    />

                    {product.title === "Cam Unlimited" ? (
                        <span className="text-base font-semibold leading-[100%] tracking-[-0.2%]">
                            <span className="text-[#0B0D10]">Cam </span>
                            <span className="text-[#4E2FD2]">Unlimited</span>
                        </span>
                    ) : (
                        <span className="text-base font-normal text-[#0B0D10]">
                            {product.title}
                        </span>
                    )}
                </div>

                <div className="flex flex-col items-end">
                    {product.compareAtPrice && (
                        <span className="text-[14px] text-[#6F7882] line-through">
                            {(product.compareAtPrice * quantity).toFixed(2)}/mo
                        </span>
                    )}

                    <span className="text-[14px] font-semibold text-[#4E2FD2]">
                        {lineTotal.toFixed(2)}/mo
                    </span>
                </div>

            </article>
        );
    }
    return (
        <article className="flex items-center justify-between pb-3">

            {/* Product Image */}
            <div className="flex items-center gap-3">
                <div
                    className="rounded-[5px] p-2 bg-white"
                >
                    <img
                        src={imageSrc}
                        alt={product.title}
                        className="h-10 w-10"
                    />
                </div>

                {/* product title */}

                <div className="text-[14px] font-normal text-[#0B0D10] leading-[16px] tracking-[0.5%]">
                    {product.title}

                </div>
            </div>


            {/* Quantity */}
            <div className="flex items-center gap-4">
                <div className="flex">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();

                            updateQuantity(
                                product.id,
                                selectedVariant?.id ?? "",
                                -1
                            );
                        }}
                        className="flex items-center justify-center rounded cursor-pointer"
                    >
                        <img
                            src="/Minus.svg"
                            alt="Decrease quantity"
                            className="h-5 w-5"
                        />
                    </button>

                    <span className="mx-[10px]">{quantity}</span>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();

                            updateQuantity(
                                product.id,
                                selectedVariant?.id ?? "",
                                1
                            );
                        }}
                        className="flex items-center justify-center rounded cursor-pointer"
                    >
                        <img
                            src="/Plus.svg"
                            alt="Increase quantity"
                            className="h-5 w-5"
                        />
                    </button>
                </div>


                <div className="flex flex-col max-w-[41px]">
                    {product.compareAtPrice && (
                        <div className="text-[14px] text-[#6F7882] font-normal line-through tracking-[0.5%] leading-[16px]">
                            $
                            {(
                                product.compareAtPrice *
                                quantity
                            ).toFixed(2)}
                        </div>
                    )}

                    <span className="text-[14px] font-semibold text-[#4E2FD2]">
                        {lineTotal === 0
                            ? "FREE"
                            : `$${lineTotal.toFixed(2)}`}
                    </span>
                </div>
            </div>



        </article>
    );
}

export default ReviewItem;
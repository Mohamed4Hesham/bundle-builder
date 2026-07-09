import type { SelectedProducts } from "../../../types/selectedproducts";
import toast from "react-hot-toast";
import type { Shipping } from "../../../types/shipping";
import satisfactioBadge from "../../../assets/images/Satisfaction Badge-05 1.png"

interface ReviewSummaryProps {
    subtotal: number;
    savings: number;
    total: number;
    compareAtTotal: number;
    selectedProducts: SelectedProducts[];
    shipping: Shipping | null;
}

function ReviewSummary({
    subtotal,
    savings,
    compareAtTotal,
    total,
    selectedProducts,
    shipping
}: ReviewSummaryProps) {

    const handleSaveSystem = () => {
        console.log(selectedProducts)
        localStorage.setItem(
            "bundle-builder",
            JSON.stringify({
                selectedProducts,
                shipping,
            })
        );

        toast.success("Your system has been saved.");
    };

    const handleCheckout = () => {
        toast.success("Your order has been submitted successfully!");
    };

    return (
        <div className="">

            {/* Top Summary */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <img
                        src={satisfactioBadge}
                        alt="Satisfaction Guarantee"
                        className="h-20 w-20"
                    />

                </div>
                <div className="flex flex-col items-end">

                    <div className="rounded-[3px] bg-[#4E2FD2] px-2 py-1 text-[12px] font-normal text-white text-[12px] tracking-[-5%] leading-[100%] mb-2">
                        As low as $19.19/mo
                    </div>

                    <div className="flex items-center gap-2">

                        <span className="text-[18px] font-normal leading-[20px] tracking-[-0.25%] text-[#6F7882] line-through">
                            ${compareAtTotal.toFixed(2)}
                        </span>

                        <span className="text-[24px] font-semibold leading-[32px] tracking-[-0.13%] text-[#4E2FD2]">
                            ${total.toFixed(2)}
                        </span>

                    </div>

                </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
                {savings > 0 && (
                    <div className="text-[12px] font-normal text-[#0AA288] tracking-[-0.06px] leading-[100%] text-center">
                        Congrats! You’re saving ${savings.toFixed(2)} on your security bundle!
                    </div>
                )}


                <button
                    onClick={handleCheckout}
                    type="button"
                    className="w-full rounded-[4px] bg-[#4E2FD2] px-4 py-3 text-[17px] font-bold text-white font-tt-norms leading-none"
                >
                    Checkout
                </button>
                <div
                    onClick={handleSaveSystem}
                    className="mb-[31px] text-center text-[14px] font-normal text-[#484848] tracking-[-0.02px] underline cursor-pointer font-gilroy italic leading-[120%]"
                >
                    Save my system for later
                </div>

            </div>

        </div>
    );
}

export default ReviewSummary;
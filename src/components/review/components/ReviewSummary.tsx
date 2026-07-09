import type { SelectedProducts } from "../../../types/selectedproducts";
import toast from "react-hot-toast";
interface ReviewSummaryProps {
    subtotal: number;
    savings: number;
    total: number;
    compareAtTotal: number;
    selectedProducts: SelectedProducts[];

}

function ReviewSummary({
    subtotal,
    savings,
    compareAtTotal,
    total,
    selectedProducts
}: ReviewSummaryProps) {

    const handleSaveSystem = () => {
        localStorage.setItem(
            "bundle-builder",
            JSON.stringify(selectedProducts)
        );

toast.success("Your system has been saved.");

    };
    return (
        <div className="mt-8 border-t border-[#E7E7E7] pt-6">

            {/* Savings */}

            {savings > 0 && (
                <div className="mb-3 flex items-center justify-between">
                    <span className="text-[15px] text-[#6F6F6F]">
                        Savings
                    </span>

                    <span className="text-[15px] font-medium text-[#4E2FD2]">
                        -${savings.toFixed(2)}
                    </span>
                </div>
            )}

            {/* Subtotal */}

            <div className="mb-3 flex items-center justify-between">
                <span className="text-[15px] text-[#6F6F6F]">
                    Subtotal
                </span>

                <span className="text-[16px] font-semibold text-[#1F1F1F]">
                    ${subtotal.toFixed(2)}
                </span>
            </div>

            {/* Shipping */}

            <div className="mb-6 flex items-center justify-between">
                <span className="text-[15px] text-[#6F6F6F]">
                    Shipping
                </span>

                <span className="text-[15px] font-medium text-[#1F1F1F]">
                    Free
                </span>
            </div>

            {/* Divider */}

            <div className="mb-6 h-px bg-[#E7E7E7]" />

            {/* Total */}

            <div className="mb-8 flex items-center justify-between">

                <span className="text-[20px] font-semibold text-[#1F1F1F]">
                    Total
                </span>

                <span className="text-[24px] font-bold text-[#1F1F1F]">
                    ${total.toFixed(2)}
                </span>

            </div>

            {/* Save For Later */}

            <button
                onClick={handleSaveSystem}
                type="button"
                className="mb-4 w-full rounded-[8px] border border-[#4E2FD2] py-3 text-[16px] font-semibold text-[#4E2FD2] transition-colors hover:bg-[#4E2FD208]"
            >
                Save my system for later
            </button>

            {/* Checkout */}

            <button
                type="button"
                className="w-full rounded-[8px] bg-[#4E2FD2] py-3 text-[16px] font-semibold text-white transition-opacity hover:opacity-90"
            >
                Continue to Checkout
            </button>

        </div>
    );
}

export default ReviewSummary;
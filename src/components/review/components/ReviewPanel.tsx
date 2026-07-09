import type { Product } from "../../../types/product";
import type { SelectedProducts } from "../../../types/selectedproducts";
import type { Shipping } from "../../../types/shipping";
import ReviewSection from "./Reviewsection";
import ReviewSummary from "./ReviewSummary";
import ShippingSection from "./ShippingSection";

interface ReviewPanelProps {
  products: Product[];
  selectedProducts: SelectedProducts[];
  shipping: Shipping | null
  updateQuantity: (productId: string, selectedVariant: string, deltaNumber: number) => void;
}

function ReviewPanel({
  products,
  selectedProducts,
  updateQuantity,
  shipping
}: ReviewPanelProps) {
  const selectedItems = selectedProducts
    .map((selected) => {
      const product = products.find(
        (product) => product.id === selected.productId
      );

      if (!product) return null;

      return {
        ...product,
        quantity: selected.quantity,
        variantId: selected.variantId,
      };
    })
    .filter(Boolean);


  const cameras = selectedItems.filter(
    (product) => product?.categoryId === "camera"
  );

  const plans = selectedItems.filter(
    (product) => product?.categoryId === "plan"
  );

  const sensors = selectedItems.filter(
    (product) => product?.categoryId === "sensor"
  );

  const accessories = selectedItems.filter(
    (product) => product?.categoryId === "accessory"
  );


  const subtotal = selectedItems.reduce(
    (total, product) =>
      total + product!.activePrice * product!.quantity,
    0
  );

  const savings =
    selectedItems.reduce((total, product) => {
      if (!product.compareAtPrice) return total;

      return (
        total +
        (product.compareAtPrice - product.activePrice) *
        product.quantity
      );
    }, 0) +
    ((shipping?.compareAtPrice ?? 0) - (shipping?.activePrice ?? 0));

  const total = subtotal;
  const compareAtTotal =
    selectedItems.reduce((total, product) => {
      const price = product.compareAtPrice ?? product.activePrice;

      return total + price * product.quantity;
    }, 0) + (shipping?.compareAtPrice ?? 0);

  return (
    <aside className="bg-[#EDF4FF] rounded-[10px] pt-4 px-5 ">

      <div className="text-[12px] font-normal text-[#484848] tracking-[1.6px] leading-[100%] mb-6">
        REVIEW
      </div>

      <div className="font-semibold text-[22px] leading-[100%] text-[#1F1F1F] mb-2">
        Your security system
      </div>
      <div className="text-[14px] font-normal leading-[130%] text-[#1F1F1F]/75 tracking-[0.6px]
      pb-[10px] border-b border-[#CED6DE] mb-4">
        Review your personalized protection system designed to keep what matters most safe.
      </div>

      <div className="">

        <ReviewSection
          title="CAMERAS"
          products={cameras}
          updateQuantity={updateQuantity}

        />


        <ReviewSection
          title="SENSORS"
          products={sensors}
          updateQuantity={updateQuantity}

        />

        <ReviewSection
          title="ACCESSORIES"
          products={accessories}
          updateQuantity={updateQuantity}

        />

        <ReviewSection
          title="PLAN"
          products={plans}
          updateQuantity={updateQuantity}

        />

        <ShippingSection shipping={shipping} />

      </div>

      <ReviewSummary
        subtotal={subtotal}
        savings={savings}
        compareAtTotal={compareAtTotal}
        total={total}
        selectedProducts={selectedProducts}
        shipping={shipping}
      />

    </aside>
  );
}

export default ReviewPanel;
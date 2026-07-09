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
    
//       useEffect(() => {
// console.log(shipping)
//       }, [shipping]);

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

  const savings = selectedItems.reduce(
    (total, product) => {
      if (!product?.compareAtPrice) return total;

      return (
        total +
        (product.compareAtPrice - product.activePrice) *
        product?.quantity
      );
    },
    0
  );

  const total = subtotal;
const compareAtTotal = selectedItems.reduce((total, product) => {
  const price = product?.compareAtPrice ?? product?.activePrice;

  return total + price * product?.quantity;
}, 0);
  return (
    <aside className="sticky top-6 h-fit rounded-[12px] border border-[#D9D9D9] bg-white p-6">

      <h2 className="text-[28px] font-semibold text-[#1F1F1F]">
        Review
      </h2>

      <p className="mt-2 text-[14px] leading-6 text-[#6F6F6F]">
        Lorem ipsum dolor sit amet consectetur. Nunc
        dignissim semper orci enim.
      </p>

      <div className="mt-8 space-y-8">

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
          title="Accessories"
          products={accessories}
          updateQuantity={updateQuantity}

        />

                <ReviewSection
          title="PLAN"
          products={plans}
          updateQuantity={updateQuantity}

        />

        <ShippingSection shipping={shipping}/>


      </div>

      <ReviewSummary
        subtotal={subtotal}
        savings={savings}
          compareAtTotal={compareAtTotal}
        total={total}
        selectedProducts={selectedProducts}
      />

    </aside>
  );
}

export default ReviewPanel;
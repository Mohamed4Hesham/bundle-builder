import type { Product } from "../../../types/product";
import ReviewItem from "./ReviewItem";

interface ReviewSectionProps {
  title: string;
  products: (Product & {
    quantity: number;
    variantId?: string;
  })[];
  updateQuantity: (productId: string, selectedVariant: string, deltaNumber: number) => void;

}

function ReviewSection({
  title,
  products,
updateQuantity
}: ReviewSectionProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold uppercase tracking-wide text-[#1F1F1F]">
          {title}
        </h3>

        <span className="text-[12px] text-[#808080]">
          {products.length} Selected
        </span>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <ReviewItem
  key={`${product.id}-${product.variantId ?? "default"}`}

            product={product}
            quantity={product.quantity}
          updateQuantity={updateQuantity}

          />
        ))}
      </div>
    </section>
  );
}

export default ReviewSection;
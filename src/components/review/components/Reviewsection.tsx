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
      <div className="border-b border-[#CED6DE] mb-4">
        <div className="text-[12px] font-normal tracking-[3%] leading-[16px] text-[#A8B2BD] mb-2">
          {title}
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
      </div>

    </section>
  );
}

export default ReviewSection;
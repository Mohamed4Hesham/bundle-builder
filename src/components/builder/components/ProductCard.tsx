import type { Product } from "../../../types/product";

interface ProductCardProps {
  product: Product;
  quantity?: number;
  selectedVariantId?: string;
  onQuantityChange?: (quantity: number) => void;
  onVariantChange?: (variantId: string) => void;
}

function ProductCard({
  product,
  quantity = 1,
  selectedVariantId,
  onQuantityChange,
  onVariantChange,
}: ProductCardProps) {
  return (
    <article className="rounded-[10px] border border-[#D9D9D9] p-4 bg-white">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="shrink-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-28 h-28 object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-1 flex-col">
          <h3 className="text-[18px] font-semibold text-[#0B0D10]">
            {product.title}
          </h3>

          {product.description && (
            <p className="mt-2 text-sm text-[#666]">
              {product.description}
            </p>
          )}

          {/* Badge */}
          {product.badge && (
            <span className="mt-3 w-fit rounded-full bg-[#E7F7EA] px-3 py-1 text-xs font-medium text-[#1A7F37]">
              {product.badge}
            </span>
          )}

          {/* Price */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xl font-semibold">
              ${product.activePrice}
            </span>

            {product.compareAtPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.compareAtPrice}
              </span>
            )}
          </div>

          {/* Variants */}
          {/* {product.variants?.length > 0 && (
            <select
              value={selectedVariantId}
              onChange={(e) => onVariantChange?.(e.target.value)}
              className="mt-4 rounded-md border border-gray-300 px-3 py-2"
            >
              {product.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name}
                </option>
              ))}
            </select>
          )} */}

          {/* Quantity */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() =>
                onQuantityChange?.(Math.max(1, quantity - 1))
              }
              className="h-8 w-8 rounded border"
            >
              -
            </button>

            <span>{quantity}</span>

            <button
              onClick={() =>
                onQuantityChange?.(quantity + 1)
              }
              className="h-8 w-8 rounded border"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
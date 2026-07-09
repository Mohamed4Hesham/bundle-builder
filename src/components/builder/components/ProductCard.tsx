import { useState } from "react";
import type { Product } from "../../../types/product";
import type { SelectedProducts } from "../../../types/selectedproducts";

interface ProductCardProps {
  product: Product;
  selected: boolean;
  selectedProducts: SelectedProducts[];
  updateQuantity: (
    productId: string,
    variantId: string,
    delta: number
  ) => void;
}
function ProductCard({
  product,
  selected,
  selectedProducts,
  updateQuantity
}: ProductCardProps) {

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0]?.id ?? ""
  );
  const currentQuantity =
    selectedProducts.find(
      (selection) =>
        selection.productId === product.id &&
        selection.variantId === selectedVariant
    )?.quantity ?? 0;

  const minusIcon =
    currentQuantity > 0
      ? "/minus-enabled.svg"
      : "/Minus.svg";
  return (
    <article
      className={`rounded-[10px] p-3 bg-white transition-all cursor-pointer ${selected
        ? "border-2 border-[#4E2FD2B2]"
        : "border border-[#D9D9D9]"
        }`}>
      <div className="flex">
        {/* Product Image */} {/* Badge */}
        <div className="mr-5">
          {product.badge && (
            <span className="text-[12px] whitespace-nowrap text-white font-medium bg-[#4E2FD2] rounded-[10px] px-[6px] py-1">
              {product.badge}
            </span>
          )}
          <img
            src={product.image}
            alt={product.title}
            className="w-26 h-35 object-contain"
          />
        </div>

        <div className="flex flex-col">
          <div className="text-base font-semibold text-[#1F1F1F] mb-2">
            {product.title}
          </div>

          {product.description && (
            <>
              <div className="text-[12px] text-[#1F1F1FBF] font-medium">
                {product.description}
              </div>
              <span className="text-[12px] underline text-[#0000EE] font-medium mb-2">{product.learnMoreUrl}</span>
            </>
          )}

          {/* Variants */}
          {product?.variants?.length > 0 && (
            <div className="mb-[10px] flex flex-wrap gap-2">
              {product?.variants?.map((variant) => (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVariant(variant.id);
                  }}
                  key={variant.id}
                  type="button"
                  className={`flex items-center rounded-[2px] border-[0.5px] px-[5px] py-[1px] text-[10px] font-medium transition-colors cursor-pointer ${selectedVariant === variant.id
                    ? "border-[#0AA288] bg-[#1DF0BB0A] text-[#1F1F1F]"
                    : "border-[#CCCCCC] text-[#1F1F1F] hover:border-[#0AA288] hover:bg-[#1DF0BB0A]"
                    }`}
                >
                  <img
                    src={variant.image}
                    className="w-7 h-7"
                  />
                  {variant.name}
                </button>
              ))}

            </div>
          )}
          <div className="flex justify-between">
            <div className="flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  updateQuantity(
                    product.id,
                    selectedVariant,
                    -1
                  );
                }}
                className="flex items-center justify-center rounded cursor-pointer"
              >
                <img
                  src={minusIcon}
                  alt={product.title}
                  className="h-5 w-5"
                />
              </button>

              <span className="mx-[10px]">{currentQuantity}</span>

              <button
                onClick={(e) => {
                  e.stopPropagation();

                  updateQuantity(
                    product.id,
                    selectedVariant,
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


            {/* Price */}
            <div className=" flex flex-col">
              {product.compareAtPrice && (
                <span className="text-base text-[#D8392B] line-through font-normal">
                  ${product.compareAtPrice}
                </span>
              )}
              <span className="text-base font-normal text-[#575757]">
                ${product.activePrice}
              </span>


            </div>
          </div>

        </div>


      </div>

    </article>
  );
}

export default ProductCard;
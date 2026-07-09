import type { Shipping } from "../../../types/shipping";

interface ShippingSectionProps {
  shipping: Shipping | null;
}

function ShippingSection({ shipping }: ShippingSectionProps) {
  return (
    <article className="flex gap-4 border-b border-[#E7E7E7] pb-4">
      {/* Image */}
      <div className="h-20 w-20 shrink-0 rounded-md border border-[#E5E5E5] bg-white p-2">
        <img
          src={shipping?.image}
          alt={shipping?.title}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 items-center justify-between">
        <h4 className="text-[16px] font-semibold text-[#1F1F1F]">
          {shipping?.title}
        </h4>

        <div className="text-right">
          <div className="text-[13px] text-[#D8392B] line-through">
            ${shipping?.compareAtPrice.toFixed(2)}
          </div>

          <div className="text-[18px] font-semibold text-[#1F1F1F]">
            {shipping?.activePrice === 0
              ? "Free"
              : `$${shipping?.activePrice.toFixed(2)}`}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ShippingSection;
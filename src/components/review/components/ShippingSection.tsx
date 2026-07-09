import type { Shipping } from "../../../types/shipping";

interface ShippingSectionProps {
  shipping: Shipping | null;
}

function ShippingSection({ shipping }: ShippingSectionProps) {
  return (
    <article className="flex gap-3 mb-[10px]">
      {/* Image */}
      <div className="bg-white p-2">
        <img
          src={shipping?.image}
          alt={shipping?.title}
          className="h-10 w-10"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 items-center justify-between">
        <div className="text-[14px] font-normal text-[#0B0D10] tracking-[0.5%] leading-[16px]">
          {shipping?.title}
        </div>

        <div className="text-right">
          <div className="text-[14px] line-through text-[#6F7882] tracking-[0.5%] leading-[16px]">
            ${shipping?.compareAtPrice.toFixed(2)}
          </div>

          <div className="text-[14px] font-semibold text-[#4E2FD2] tracking-[0.5%] leading-[16px]">
            {shipping?.activePrice === 0
              ? "FREE"
              : `$${shipping?.activePrice.toFixed(2)}`}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ShippingSection;
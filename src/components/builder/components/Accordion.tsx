import { ReactNode } from "react";
import arrow from "../../../assets/icons/carrot-up.svg";
interface AccordionProps {
    isOpen: boolean;
    onToggle: () => void;
    title: string;
    icon: string;
    subtitle?: string;
    stepOrder: number;
    children: ReactNode;
    selectedCount: number;
}

function Accordion({
    isOpen,
    onToggle,
    title,
    icon,
    stepOrder,
    children,
    selectedCount
}: AccordionProps) {
    return (
        <div className={`mb-3 cursor-pointer transition-colors duration-200 ${isOpen ? "bg-[#EDF4FF] border-transparent py-4 px-5 rounded-[10px]" : "bg-white"
            }`}>
            <div className="text-[12px] text-[#484848] px-4 mb-1">
                STEP {stepOrder} OF 4
            </div>
            <div
                onClick={onToggle}
                className={`flex w-full items-center justify-between py-5 border-[#1F1F1F] ${isOpen ? "border-t-[0.5px]" : "border-y-[0.5px]"
                    }`}
            >
                <div>
                    <div className="flex items-center gap-x-2">
                        <img src={icon} alt="Live Stream" className="w-6 h-6" />

                        <div className="text-[22px] font-semibold text-[#0B0D10] leading-[100%]">
                            {title}
                        </div>
                    </div>

                </div>
                <div className="flex items-center">
                    {selectedCount > 0 && isOpen && (
                        <span className="text-[#4E2FD2] px-2 py-1 text-[14px] mr-1">
                            {selectedCount} selected
                        </span>
                    )}
                    <span
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                            }`}
                    >
                        <img src={arrow} alt="Arrow" className="w-3 h-3" />
                    </span>
                </div>


            </div>

            {isOpen && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}

export default Accordion;
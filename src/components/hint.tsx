import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type Props = {
  label: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  alignOffset?: number;
  sideOffset?: number;
};

const Hint = ({
  label,
  children,
  side,
  align,
  alignOffset,
  sideOffset,
}: Props) => {
  return (
    <div>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent
            className="text-white bg-slate-800 border-slate-800 "
            side={side}
            align={align}
            alignOffset={alignOffset}
            sideOffset={sideOffset}
          >
            <p className="semibold capitalize">{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Hint;

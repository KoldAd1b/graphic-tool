import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";
import { IconType } from "react-icons";

type Props = {
  onClick: () => void;
  icon: LucideIcon | IconType;
  iconClassName?: string;
};

const ShapeTool = ({ onClick, icon: Icon, iconClassName }: Props) => {
  return (
    <button onClick={onClick} className="aspect-square border rounded-md p-5">
      <Icon className={cn("h-full w-full", iconClassName)} />
    </button>
  );
};

export default ShapeTool;

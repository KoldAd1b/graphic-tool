import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  icon: LucideIcon;
  href: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

const SidebarItem = ({ icon: Icon, href, label, isActive, onClick }: Props) => {
  return (
    <Link href={href} onClick={onClick}>
      <div
        className={cn(
          "flex items-center px-3 py-3 rounded-xl bg-transparent hover:background-white transition ",
          isActive && "bg-white"
        )}
      >
        <Icon className="size-4 mr-2 stroke-2" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
};

export default SidebarItem;

"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Crown,
  HomeIcon,
  MessageCircleQuestion,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import { useCheckout } from "@/features/subscriptions/api/use-checkout";
import { useBilling } from "@/features/subscriptions/api/use-billing";

const SidebarRoutes = () => {
  const { isLoading, shouldBlock, triggerPaywall } = usePaywall();
  const billingMutation = useBilling();
  const mutation = useCheckout();
  const pathname = usePathname();

  const onClick = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }

    billingMutation.mutate();
  };

  return (
    <div className="flex flex-col gap-y-4 flex-1">
      {shouldBlock && !isLoading && (
        <div className="px-3">
          <Button
            onClick={() => {
              mutation.mutate();
            }}
            className="w-full rounded-xl border-none hover:bg-white hover:opacity-75  transition "
            variant={"outline"}
            size={"lg"}
          >
            <Crown className="mr-2 size-4 fill-yellow-500 text-yellow-500" />
            Upgrade to pro
          </Button>
        </div>
      )}

      <div className="px-3">
        <Separator />
      </div>
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href="/"
          icon={HomeIcon}
          label="Home"
          isActive={pathname === "/"}
        />
      </ul>
      <div className="px-3">
        <Separator />
      </div>
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href={`${pathname}`}
          icon={CreditCard}
          label="Billing"
          onClick={() => {
            onClick();
          }}
        />
        <SidebarItem
          href={`mailto:support@canvajs.com`}
          icon={MessageCircleQuestion}
          label="Get help"
          onClick={() => {}}
        />
      </ul>
    </div>
  );
};

export default SidebarRoutes;

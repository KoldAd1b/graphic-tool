import { useSubscriptionModal } from "../store/use-subscription-model";
import { useGetSubscription } from "../api/use-get-subscription";

export const usePaywall = () => {
  const subscriptionModal = useSubscriptionModal();
  const { isLoading, data } = useGetSubscription();

  const shouldBlock = !data?.active || isLoading;
  return {
    isLoading,
    shouldBlock,
    triggerPaywall: () => {
      subscriptionModal.onOpen();
    },
  };
};

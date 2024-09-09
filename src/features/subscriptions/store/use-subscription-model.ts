import { create } from "zustand";

type SubscriptionModalState = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const useSubscriptionModal = create<SubscriptionModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

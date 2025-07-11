import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DeliveryState {
  deliveryMode: 'delivery' | 'pickup';
  setDeliveryMode: (mode: 'delivery' | 'pickup') => void;
}

export const useDeliveryStore = create<DeliveryState>()(
  persist(
    (set) => ({
      deliveryMode: 'delivery',
      setDeliveryMode: (mode) => set({ deliveryMode: mode }),
    }),
    {
      name: 'delivery-storage',
    }
  )
);
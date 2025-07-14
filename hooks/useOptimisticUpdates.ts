'use client';
import { create } from 'zustand';

interface OptimisticUpdate {
  id: string;
  type: 'add' | 'update' | 'remove';
  data: any;
  timestamp: number;
  status: 'pending' | 'success' | 'error';
  retryCount: number;
}

interface OptimisticStoreState {
  updates: OptimisticUpdate[];
  addUpdate: (update: Omit<OptimisticUpdate, 'id' | 'timestamp' | 'status' | 'retryCount'>) => string;
  updateStatus: (id: string, status: 'success' | 'error') => void;
  removeUpdate: (id: string) => void;
  getPendingUpdates: () => OptimisticUpdate[];
  retryUpdate: (id: string) => void;
}

export const useOptimisticStore = create<OptimisticStoreState>((set, get) => ({
  updates: [],
  
  addUpdate: (update) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newUpdate: OptimisticUpdate = {
      ...update,
      id,
      timestamp: Date.now(),
      status: 'pending',
      retryCount: 0
    };
    
    set((state) => ({
      updates: [...state.updates, newUpdate]
    }));
    
    return id;
  },
  
  updateStatus: (id, status) => {
    set((state) => ({
      updates: state.updates.map(update =>
        update.id === id ? { ...update, status } : update
      )
    }));
    
    // Remove successful updates after a delay
    if (status === 'success') {
      setTimeout(() => {
        set((state) => ({
          updates: state.updates.filter(update => update.id !== id)
        }));
      }, 1000);
    }
  },
  
  removeUpdate: (id) => {
    set((state) => ({
      updates: state.updates.filter(update => update.id !== id)
    }));
  },
  
  getPendingUpdates: () => {
    return get().updates.filter(update => update.status === 'pending');
  },
  
  retryUpdate: (id) => {
    set((state) => ({
      updates: state.updates.map(update =>
        update.id === id 
          ? { ...update, retryCount: update.retryCount + 1, status: 'pending' as const }
          : update
      )
    }));
  }
}));

// Hook untuk optimistic cart updates
export function useOptimisticCart() {
  const { addUpdate, updateStatus, removeUpdate, getPendingUpdates } = useOptimisticStore();
  
  const addToCartOptimistic = async (
    productId: string, 
    quantity: number,
    apiCall: () => Promise<any>
  ) => {
    // Add optimistic update
    const updateId = addUpdate({
      type: 'add',
      data: { productId, quantity }
    });
    
    try {
      const result = await apiCall();
      updateStatus(updateId, 'success');
      return result;
    } catch (error) {
      updateStatus(updateId, 'error');
      throw error;
    }
  };
  
  const updateQuantityOptimistic = async (
    itemId: string,
    newQuantity: number,
    apiCall: () => Promise<any>
  ) => {
    const updateId = addUpdate({
      type: 'update',
      data: { itemId, quantity: newQuantity }
    });
    
    try {
      const result = await apiCall();
      updateStatus(updateId, 'success');
      return result;
    } catch (error) {
      updateStatus(updateId, 'error');
      throw error;
    }
  };
  
  const removeFromCartOptimistic = async (
    itemId: string,
    apiCall: () => Promise<any>
  ) => {
    const updateId = addUpdate({
      type: 'remove',
      data: { itemId }
    });
    
    try {
      const result = await apiCall();
      updateStatus(updateId, 'success');
      return result;
    } catch (error) {
      updateStatus(updateId, 'error');
      throw error;
    }
  };
  
  return {
    addToCartOptimistic,
    updateQuantityOptimistic,
    removeFromCartOptimistic,
    getPendingUpdates
  };
}

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FavoriteStore {
  favoriteIds: string[];
  addFavorite: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      addFavorite: (productId) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(productId)
            ? state.favoriteIds
            : [...state.favoriteIds, productId],
        })),
      removeFavorite: (productId) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.filter((id) => id !== productId),
        })),
      isFavorite: (productId) => {
        const { favoriteIds } = get();
        return favoriteIds.includes(productId);
      },
      toggleFavorite: (productId) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        if (isFavorite(productId)) {
          removeFavorite(productId);
        } else {
          addFavorite(productId);
        }
      },
    }),
    {
      name: 'favorite-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist the favoriteIds array
      partialize: (state) => ({ favoriteIds: state.favoriteIds }),
    }
  )
); 
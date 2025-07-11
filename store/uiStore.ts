import { create } from 'zustand';

type OverlayType = 'none' | 'mobileMenu' | 'notifications' | 'userMenu';

interface UIState {
  activeOverlay: OverlayType;
  notificationCount: number;
  setActiveOverlay: (overlay: OverlayType) => void;
  closeAllOverlays: () => void;
  incrementNotifications: () => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeOverlay: 'none',
  notificationCount: 3, // Initial count for prototype
  setActiveOverlay: (overlay) => set({ activeOverlay: overlay }),
  closeAllOverlays: () => set({ activeOverlay: 'none' }),
  incrementNotifications: () => set((state) => ({ notificationCount: state.notificationCount + 1 })),
  clearNotifications: () => set({ notificationCount: 0 }),
}));
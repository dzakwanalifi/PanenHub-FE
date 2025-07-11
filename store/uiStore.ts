import { create } from 'zustand';

type OverlayType = 'none' | 'mobileMenu' | 'notifications' | 'userMenu';

interface UIState {
  activeOverlay: OverlayType;
  setActiveOverlay: (overlay: OverlayType) => void;
  closeAllOverlays: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeOverlay: 'none',
  setActiveOverlay: (overlay) => set({ activeOverlay: overlay }),
  closeAllOverlays: () => set({ activeOverlay: 'none' }),
}));
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Location {
  name: string;
  address: string;
}

interface LocationState {
  currentLocation: Location;
  setCurrentLocation: (location: Location) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      currentLocation: {
        name: 'Green Valley Point',
        address: '123 Main Street, Green Valley'
      },
      setCurrentLocation: (location) => set({ currentLocation: location }),
    }),
    {
      name: 'location-storage',
    }
  )
);
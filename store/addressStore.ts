import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

interface AddressState {
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  getDefaultAddress: () => Address | undefined;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: [
        {
          id: '1',
          name: 'John Doe',
          phone: '+62 812-3456-7890',
          street: 'Jl. Sudirman No. 123',
          city: 'Jakarta Pusat',
          state: 'DKI Jakarta',
          zipCode: '10220',
          isDefault: true,
        },
        {
          id: '2',
          name: 'John Doe',
          phone: '+62 812-3456-7890',
          street: 'Jl. Thamrin No. 456',
          city: 'Jakarta Pusat',
          state: 'DKI Jakarta',
          zipCode: '10230',
          isDefault: false,
        },
      ],
      addAddress: (address) => {
        const newAddress = {
          ...address,
          id: Date.now().toString(),
        };
        set((state) => ({
          addresses: [...state.addresses, newAddress],
        }));
      },
      updateAddress: (id, updatedData) => {
        set((state) => ({
          addresses: state.addresses.map((addr) =>
            addr.id === id ? { ...addr, ...updatedData } : addr
          ),
        }));
      },
      deleteAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.filter((addr) => addr.id !== id),
        }));
      },
      setDefaultAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.map((addr) => ({
            ...addr,
            isDefault: addr.id === id,
          })),
        }));
      },
      getDefaultAddress: () => {
        return get().addresses.find((addr) => addr.isDefault);
      },
    }),
    {
      name: 'address-storage',
    }
  )
); 

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((item) => item !== id)
            : [...state.favorites, id]
        }));
      },

      isFavorite: (id) => get().favorites.includes(id)
    }),
    {
      name: 'pulso-abierto-favorites',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

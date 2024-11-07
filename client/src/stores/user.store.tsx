import { create } from 'zustand';
import { User } from '../api/types';
import { persist } from 'zustand/middleware';
import { fetchCurrentUser } from '../api/user.api';

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  fetchCurrentUser: () => Promise<void>;
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      fetchCurrentUser: async () => {
        const { user, clearUser, setUser } = useUserStore.getState();

        if (!user || !user.token) {
          return;
        }

        try {
          const res = await fetchCurrentUser();

          if (!res.data) {
            clearUser();
          }

          setUser(res.data);
        } catch {
          clearUser();
        }
      },
    }),
    {
      name: 'user',
    },
  ),
);

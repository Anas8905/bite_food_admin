import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mockAuthAPI } from '@/api/mockApi';
import { asyncStorage } from '@/services/asyncStorage';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      hydrated: false,

      setUser: (u) => set({ user: u }),
      setLoading: (v) => set({ loading: v }),

      login: async (user) => {
        const res = await mockAuthAPI.validateUser(user);
        if (res.success) set({ user });
        return res;
      },

      updateProfile: async (userData) => {
        const res = await mockAuthAPI.updateProfile(userData);
        if (res.success) set({ user: userData });
        return res;
      },

      clearLocalAuthData: async () => {
        set({ user: null });
        await Promise.all([]);
      },

      logout: async () => {
        await get().clearLocalAuthData();
      },
    }),
    {
      name: 'admin-auth-store',
      storage: createJSONStorage(() => asyncStorage),
      partialize: (s) => ({ user: s.user }),
      version: 1,
      onRehydrateStorage: () => {
        return (_state, error) => {
          useAuthStore.setState({
            hydrated: true,
          });
          if (error) {
            console.error('Auth rehydration failed:', error);
            useAuthStore.setState({ hydrated: true });
          }
        };
      },
    }
  )
);


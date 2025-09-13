import { useColorScheme } from 'react-native';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      preference: 'system',
      setPreference: (pref) => set({ preference: pref }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useResolvedTheme = (): 'light' | 'dark' => {
  const systemTheme = useColorScheme();
  const preference = useThemeStore((s) => s.preference);

  if (preference === 'system') {
    return systemTheme === 'dark' ? 'dark' : 'light';
  }
  return preference;
}

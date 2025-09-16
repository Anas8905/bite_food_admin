import { useColorScheme } from 'react-native';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      preference: 'device',
      setPreference: (pref) => set({ preference: pref }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useResolvedTheme = (): 'light' | 'dark' => {
  const deviceTheme = useColorScheme();
  const preference = useThemeStore((s) => s.preference);

  if (preference === 'device') {
    return deviceTheme === 'dark' ? 'dark' : 'light';
  }
  return preference;
}

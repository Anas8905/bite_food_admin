import { useThemeStore } from '@/stores/theme';

export function useThemePreference(): {
    preference: ThemePreference;
    setPreference: (pref: ThemePreference) => void;
    cyclePreference: () => void;
} {
  const preference = useThemeStore((s) => s.preference);
  const setPreference = useThemeStore((s) => s.setPreference);

  const cyclePreference = () => {
    if (preference === 'device') setPreference('light');
    else if (preference === 'light') setPreference('dark');
    else setPreference('device');
  };

  return { preference, setPreference, cyclePreference };
}

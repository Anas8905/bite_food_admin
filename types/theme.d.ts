type ThemePreference = 'system' | 'light' | 'dark';

type ThemeState = {
  preference: ThemePreference;
  setPreference: (pref: ThemePreference) => void;
};

type ThemeOption = {
  label: string;
  value: 'system' | 'light' | 'dark';
  icon: React.ComponentProps<typeof Feather>['name'];
};

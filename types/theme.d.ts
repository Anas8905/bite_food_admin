type ThemePreference = 'device' | 'light' | 'dark';

type ThemeState = {
  preference: ThemePreference;
  setPreference: (pref: ThemePreference) => void;
};

type ThemeOption = {
  label: string;
  value: 'device' | 'light' | 'dark';
  icon: React.ComponentProps<typeof Feather>['name'];
};

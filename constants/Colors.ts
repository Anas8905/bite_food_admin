const tintColorLight = '#FA4F0C'; // accentPrimary (light)
const tintColorDark = '#FF6028';  // accentPrimary (dark)

export const Colors = {
  light: {
    text: '#121212',            // textPrimary
    background: '#FFFFFF',      // bgPrimary
    tint: tintColorLight,       // used for links/primary actions
    icon: '#646982',            // textSecondary as default icon
    tabIconDefault: '#646982',
    tabIconSelected: tintColorLight,

    textPrimary: '#121212',
    textSecondary: '#646982',
    textTertiary: '#A0A5BA',
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F7F8F9',
    inputBackground: '#F0F5FA',
    greyIconBg: '#ECF0F4',
    borderLight: '#EDEDED',
    borderDark: '#D9D9D9',
    accentPrimary: '#FA4F0C',
  },

  dark: {
    text: '#E5FFFFFF',          // 90% white => #AARRGGBB
    background: '#121212',
    tint: tintColorDark,
    icon: '#FFFFFF',
    tabIconDefault: '#ABFFFFFF',
    tabIconSelected: tintColorDark,

    textPrimary: '#E5FFFFFF',   // 90%
    textSecondary: '#ABFFFFFF', // 67%
    textTertiary: '#80FFFFFF',  // 50%
    bgPrimary: '#121212',
    bgSecondary: '#1A1A1A',
    inputBackground: '#2C2C2C',
    greyIconBg: '#2C2C2C',
    borderLight: '#EDEDED',
    borderDark: '#D9D9D9',
    accentPrimary: '#FF6028',
  },
} as const;

export type Theme = keyof typeof Colors;

const tintColorLight = '#FA4F0C'; // accentPrimary (light)
const tintColorDark = '#FF6028';  // accentPrimary (dark)

export type Theme = keyof typeof Colors;

export const Colors = {
  light: {
    text: '#121212',            // textPrimary
    background: '#F7F8F9',      // bgPrimary
    tint: tintColorLight,       // used for links/primary actions
    icon: '#646982',            // textSecondary as default icon
    iconActive: '#FFFFFF',
    tabIconDefault: '#646982',
    tabIconSelected: tintColorLight,
    splashBg: tintColorLight,
    splashIcon: '#ffffff',

    textPrimary: '#121212',
    textSecondary: '#646982',
    textTertiary: '#333333',
    textMuted: '#777777',
    bgPrimary: '#F7F8F9',
    bgSecondary: '#FFFFFF',
    inputBackground: '#F0F5FA',
    greyBg: '#ECF0F4',
    borderLight: '#DDDDDD',
    borderDark: '#CCCCCC',
    accentPrimary: '#FA4F0C',
  },

  dark: {
    text: '#FFFFFF',
    background: '#121212',
    tint: tintColorDark,
    icon: '#FFFFFF',
    iconActive: '#FFFFFF',
    tabIconDefault: '#ABFFFFFF',
    tabIconSelected: tintColorDark,
    splashBg: '#121212',
    splashIcon: tintColorDark,

    textPrimary: '#FFFFFF',
    textSecondary: '#BBBBBB',
    textTertiary: '#B3B3B3',
    textMuted: '#777777',
    bgPrimary: '#121212',
    bgSecondary: '#1A1A1A',
    inputBackground: '#2C2C2C',
    greyBg: '#2C2C2C',
    borderLight: '#333333',
    borderDark: '#444444',
    accentPrimary: '#FF6028',
  },
} as const;


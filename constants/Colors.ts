const tintColorLight = '#FA4F0C'; // accentPrimary (light)
const tintColorDark = '#FF6028';  // accentPrimary (dark)

export type Theme = keyof typeof Colors;

export const Colors = {
  light: {
    text: '#121212',            // textPrimary
    background: '#FFFFFF',      // bgPrimary
    tint: tintColorLight,       // used for links/primary actions
    icon: '#646982',            // textSecondary as default icon
    iconActive: '#FFFFFF',
    tabIconDefault: '#646982',
    tabIconSelected: tintColorLight,

    textPrimary: '#121212',
    textSecondary: '#646982',
    textTertiary: '#888',
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F7F8F9',      // default bg od screens
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
    iconActive: '#FFFFFF',
    tabIconDefault: '#ABFFFFFF',
    tabIconSelected: tintColorDark,

    textPrimary: '#E5FFFFFF',   // 90%
    textSecondary: '#ABFFFFFF', // 67%
    textTertiary: '#888',
    bgPrimary: '#121212',
    bgSecondary: '#1A1A1A',    // default bg od screens
    inputBackground: '#2C2C2C',
    greyIconBg: '#2C2C2C',
    borderLight: '#EDEDED',
    borderDark: '#666',
    accentPrimary: '#FF6028',
  },
} as const;


import { Colors } from '@/constants/Colors';
import { useResolvedTheme } from '@/stores/theme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
): string {
  const theme = useResolvedTheme();
  const colorFromProps = props[theme];

  return colorFromProps ?? Colors[theme][colorName];
}

import { Colors } from '@/constants/Colors';
import { useResolvedTheme } from '@/stores/theme';

export function useThemeColors() {
  const scheme = useResolvedTheme();
  return Colors[scheme];
}

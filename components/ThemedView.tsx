// components/ThemedView.tsx
import { View, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedViewProps = ViewProps & {
  colorName?: keyof typeof Colors.light;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, colorName = 'background', lightColor, darkColor, ...otherProps }: ThemedViewProps): React.JSX.Element {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, colorName);

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

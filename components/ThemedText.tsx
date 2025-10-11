import { StyleSheet, Text, type TextProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedTextProps = TextProps & {
  colorName?: keyof typeof Colors.light;
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  colorName = 'text',
  ...rest
}: ThemedTextProps): React.JSX.Element {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, colorName);

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    fontFamily: 'Sen_400Regular',
  },
  defaultSemiBold: {
    fontSize: 16,
    fontFamily: 'Sen_500Medium',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Sen_700Bold',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Sen_600SemiBold',
  },
  link: {
    fontSize: 16,
    color: '#0a7ea4',
    fontFamily: 'Sen_400Regular',
  },
});

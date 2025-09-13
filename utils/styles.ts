import { StyleSheet } from 'react-native';
import { useThemeColors } from '../hooks/useThemeColors';

export const createThemedStyles = <
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(
  stylesFactory: (colors: ReturnType<typeof useThemeColors>) => T
) => (): T => {
  const colors = useThemeColors();
  return StyleSheet.create(stylesFactory(colors));
};

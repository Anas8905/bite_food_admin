import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { noNavScreens, screens } from '@/constants/Screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppDrawer from '@/components/AppDrawer';
import { AlertHost } from '@/components/AlertHost';
import { NetworkListener } from '@/components/NetworkListener';
import { SafeAreaView, StyleSheet } from 'react-native';
import { isAndroid } from '@/utils/common.utils';
import { ThemedView } from '@/components/ThemedView';
import Navbar from '@/components/ui/Navbar';
import { useThemeColors } from '@/hooks/useThemeColors';

export default function RootLayout(): React.JSX.Element | null {
  const colorScheme = useColorScheme();
  const colors = useThemeColors();
  const [loaded] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf') });
  const pathname = usePathname();
  const showNavbar = !noNavScreens.includes(pathname);

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <NetworkListener />
        {showNavbar && (
          <SafeAreaView style={{ backgroundColor: colors.bgPrimary }}>
            <ThemedView style={styles.container}>
              <Navbar />
            </ThemedView>
          </SafeAreaView>
        )}
        <Stack screenOptions={{ headerShown: false }}>
            {screens.map((name) => (
              <Stack.Screen key={name} name={name} />
            ))}
        </Stack>
        <AppDrawer />
        <AlertHost />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: isAndroid ?  46 : 0,
  },
})
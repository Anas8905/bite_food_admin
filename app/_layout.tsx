import { AlertHost } from '@/components/AlertHost';
import AppDrawer from '@/components/AppDrawer';
import { NetworkListener } from '@/components/NetworkListener';
import { ThemedView } from '@/components/ThemedView';
import Navbar from '@/components/ui/Navbar';
import { noNavScreens, screens } from '@/constants/Screens';
import { useResolvedTheme } from '@/stores/theme';
import { isAndroid } from '@/utils/common.utils';
import { createThemedStyles } from '@/utils/styles';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout(): React.JSX.Element | null {
  const theme = useResolvedTheme();
  const styles = useThemedStyles();
  const [loaded] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf') });
  const pathname = usePathname();
  const showNavbar = !noNavScreens.includes(pathname);

  if (!loaded) return null;

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <NetworkListener />
        {showNavbar && (
          <SafeAreaView style={styles.safeAreaView}>
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
        {/* <StatusBar style={theme === 'dark' ? 'light' : 'dark'} /> */}
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const useThemedStyles = createThemedStyles(({ bgPrimary }) => ({
  safeAreaView: {
    backgroundColor: bgPrimary,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: isAndroid ?  46 : 0,
  },
}))
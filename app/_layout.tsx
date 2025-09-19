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
  const [loaded] = useFonts({ Sen: require('../assets/fonts/Sen-Regular.ttf') });
  const pathname = usePathname();
  const hideNavbar = noNavScreens.some((route) => {
    if (route.endsWith("/*")) {
      return pathname.startsWith(route.replace("/*", ""));
    }
    return pathname === route;
  });

  const categoryId = pathname.startsWith('/category/')
    ? pathname.split('/category/')[1]
    : undefined;

  if (!loaded) return null;

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <NetworkListener />
        {!hideNavbar && (
          <SafeAreaView style={styles.safeAreaView}>
            <ThemedView style={styles.container}>
              <Navbar categoryId={categoryId} />
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
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
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
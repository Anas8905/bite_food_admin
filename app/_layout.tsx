import { AlertHost } from '@/components/AlertHost';
import AppDrawer from '@/components/AppDrawer';
import NetworkListener from '@/components/NetworkListener';
import { ThemedView } from '@/components/ThemedView';
import Navbar from '@/components/ui/Navbar';
import { screens } from '@/constants/Screens';
import { useAuth } from '@/hooks/useAuth';
import { useResolvedTheme } from '@/stores/theme';
import { isAndroid } from '@/utils/common.utils';
import { createThemedStyles } from '@/utils/styles';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, usePathname, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout(): React.JSX.Element | null {
  const theme = useResolvedTheme();
  const styles = useThemedStyles();
  const { hydrated } = useAuth();
  const router = useRouter();
  const [loaded] = useFonts({ Sen: require('../assets/fonts/Sen-Regular.ttf') });
  const pathname = usePathname();
  const rawSegments = useSegments();
  const segments = rawSegments as string[];

  const normalizedPath = pathname.replace("/(tabs)", "");
  const isPublic = segments.length === 0 || pathname === "/login";

  const hideNavbar = isPublic || normalizedPath.startsWith("/pizza/");

  const categoryId = pathname.startsWith('/category/')
    ? pathname.split('/category/')[1]
    : undefined;

  const handleRetry = () => {
    router.replace('/');
  };

  if (!hydrated || !loaded) return null;

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <NetworkListener onRetry={handleRetry}>
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
        </NetworkListener>
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
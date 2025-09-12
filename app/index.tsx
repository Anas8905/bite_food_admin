import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import { usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import LogoIcon from '@/assets/images/Ratatouille.svg';
import { useThemeColors } from '@/hooks/useThemeColors';

export default function Index(): React.JSX.Element {
  const colors = useThemeColors();
  const { user, hydrated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!hydrated) return;

    const timer = setTimeout(() => {
      if (user) {
        if (pathname !== "/dashboard") router.replace("/dashboard");
      } else {
        if (pathname !== "/login") router.replace("/login");
      }
    }, 2000); // 2s splash delay

    return () => clearTimeout(timer);
  }, [user, hydrated, pathname, router]);

  return (
    <ThemedView colorName='splashBg' style={styles.container}>
      <LogoIcon width={230} height={230} color={colors.splashIcon} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontFamily: 'serif',
    fontSize: 42,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});

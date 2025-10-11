import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import { StyleSheet } from 'react-native';
import LogoIcon from '@/assets/images/Ratatouille.svg';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index(): React.JSX.Element {
  const { user, hydrated } = useAuth();
  const { splashIcon } = useThemeColors();
  const [showRedirect, setShowRedirect] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    const t = setTimeout(() => setShowRedirect(true), 2000);
    return () => clearTimeout(t);
  }, [hydrated]);

  if (!hydrated) {
    return (
      <ThemedView colorName="splashBg" style={styles.container}>
        <LogoIcon width={230} height={230} color={splashIcon} />
      </ThemedView>
    );
  }

  if (!showRedirect) {
    return (
      <ThemedView colorName="splashBg" style={styles.container}>
        <LogoIcon width={230} height={230} color={splashIcon} />
      </ThemedView>
    );
  }

  return user ? <Redirect href="/dashboard" /> : <Redirect href="/login" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

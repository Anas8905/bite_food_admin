import { useAuth } from '@/hooks/useAuth';
import { usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Index(): React.JSX.Element {
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
    <View style={styles.container}>
      <Text style={styles.logo}>Ratatouille</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FA4A0C',
  },
  logo: {
    fontFamily: 'serif',
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
  },
});

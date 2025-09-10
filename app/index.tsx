import { usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Index(): React.JSX.Element {
  const isAuth = true;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuth) {
        if (pathname !== "/dashboard") router.replace("/dashboard");
      } else {
        if (pathname !== "/login") router.replace("/login");
      }
    }, 2000); // 2s splash delay

    return () => clearTimeout(timer);
  }, [isAuth, pathname, router]);

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

import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';
import { useAlert } from '@/hooks/useAlert';
import BackButton from '@/components/ui/BackButton';
import { useThemeColors } from '@/hooks/useThemeColors';
import { ThemedText } from '@/components/ThemedText';


export default function LoginScreen(): React.JSX.Element {
  const router = useRouter()
  const colors = useThemeColors();
  const { login } = useAuth();
  const { showAlert } = useAlert();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) {
      return showAlert('Error', 'Please enter your email.');
    }

    if (!password.trim()) {
        return showAlert('Error', 'Please enter your password.');
    }

    try {
      setLoading(true);
      await login({ email, password });

      setEmail('');
      setPassword('');
      router.navigate('/dashboard');
    } catch (error: any) {
      showAlert('Error', error.message || 'Failed to login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      {/* <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
      </View> */}

      <View style={styles.content}>
        <ThemedText style={styles.title}>Hi, there..</ThemedText>

        <View style={styles.inputGroup}>
          <ThemedText type='defaultSemiBold' style={styles.label}>What&apos;s your Email?</ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.inputBackground,
                color: colors.textPrimary,
              }
            ]}
            placeholder="Type here"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type='defaultSemiBold' style={styles.label}>What&apos;s your password?</ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.inputBackground,
                color: colors.textPrimary,
              }
            ]}
            placeholder="Type here"
            value={password}
            onChangeText={setPassword}
            textContentType="password"
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.accentPrimary }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>LOGIN</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

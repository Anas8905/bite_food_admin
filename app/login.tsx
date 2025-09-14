import { ThemedText } from '@/components/ThemedText';
import { useAlert } from '@/hooks/useAlert';
import { useAuth } from '@/hooks/useAuth';
import { createThemedStyles } from '@/utils/styles';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function LoginScreen(): React.JSX.Element {
  const styles = useThemedStyles();
  const router = useRouter()
  const { login } = useAuth();
  const { showAlert } = useAlert();
  const [fullName, setFullName] = useState('');
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
      await login({ fullName, email, password });

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
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
      </View> */}

      <View style={styles.content}>
        <ThemedText type='subtitle' style={styles.title}>Hi, there..</ThemedText>

        <View style={styles.inputGroup}>
          <ThemedText type='defaultSemiBold' style={styles.label}>What&apos;s your Full Name?</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type='defaultSemiBold' style={styles.label}>What&apos;s your Email?</ThemedText>
          <TextInput
            style={styles.input}
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
            style={styles.input}
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
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <ThemedText type='subtitle' style={styles.buttonText}>LOGIN</ThemedText>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const useThemedStyles = createThemedStyles(({
  bgPrimary,
  textPrimary,
  accentPrimary,
  inputBackground,
}) => ({
  container: {
    flex: 1,
    backgroundColor: bgPrimary,
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
    fontSize: 26,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    backgroundColor: inputBackground,
    color: textPrimary,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: accentPrimary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
}));

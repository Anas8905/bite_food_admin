import { useThemeColors } from '@/hooks/useThemeColors';
import { createThemedStyles } from '@/utils/styles';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../ThemedText';

interface NoInternetProps { onRetry: () => void; }

const NoInternet = ({ onRetry }: NoInternetProps): React.JSX.Element => {
  const styles = useThemedStyles();
  const { tint } = useThemeColors();
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    if (isRetrying) return;

    setIsRetrying(true);
    try {
      onRetry();
    } catch (error) {
      console.error('Retry failed:', error);
    } finally {
      setTimeout(() => setIsRetrying(false), 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Feather name="wifi-off" size={60} color={tint} />
      <ThemedText style={styles.title}>No Internet Connection</ThemedText>
      <ThemedText style={styles.message}>
        Your internet connection is currently not available. Please check or try again.
      </ThemedText>
      <TouchableOpacity
        style={[styles.button, isRetrying && styles.disabledBtn]}
        onPress={handleRetry}
        disabled={isRetrying}
      >
        <ThemedText type='subtitle' style={styles.buttonText}>
          {isRetrying ? 'Checking...' : 'Try again'}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const useThemedStyles = createThemedStyles(({ bgPrimary, accentPrimary, textMuted  }) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: bgPrimary,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    color: textMuted,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    width: 150,
    alignItems: 'center',
    backgroundColor: accentPrimary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  disabledBtn: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
}));

export default NoInternet;
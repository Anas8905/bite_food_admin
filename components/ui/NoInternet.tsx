import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../ThemedText';

const NoInternet = ({ onRetry }: { onRetry: () => void }): React.JSX.Element => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      onRetry();
    } finally {
      setTimeout(() => setIsRetrying(false), 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Feather name="wifi-off" size={60} color="accentPrimary" />
      <ThemedText style={styles.title}>No Internet Connection</ThemedText>
      <ThemedText style={styles.message}>
        Your internet connection is currently not available please check or try again.
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    width: 150,
    alignItems: 'center',
    backgroundColor: '#FA4A0C',
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
});

export default NoInternet;
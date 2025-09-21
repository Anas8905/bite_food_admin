import { useNetworkStore } from '@/stores/network';
import NetInfo from '@react-native-community/netinfo';
import React, { ReactNode, useEffect } from 'react';
import NoInternet from './ui/NoInternet';

interface NetworkListenerProps {
  children: ReactNode;
  onRetry?: () => void;
  fallback?: ReactNode;
}

export default function NetworkListener({
  children,
  onRetry,
  fallback
}: NetworkListenerProps): React.JSX.Element {
  const { isConnected, setIsConnected } = useNetworkStore();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(!!state.isConnected);
    });

    NetInfo.fetch().then((state) => {
      setIsConnected(!!state.isConnected);
    });

    return unsubscribe;
  }, [setIsConnected]);

  if (!isConnected) {
    if (fallback) return <>{fallback}</>;

    return <NoInternet onRetry={onRetry || (() => {})} />;
  }

  return <>{children}</>;
};

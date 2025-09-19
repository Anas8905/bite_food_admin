import { useThemeColors } from '@/hooks/useThemeColors'
import { createThemedStyles } from '@/utils/styles';
import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export default function LoadingOverlay(): React.JSX.Element {
    const styles = useThemedStyles();
    const { tint } = useThemeColors();

    return (
        <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={tint} />
        </View>
    )
}

const useThemedStyles = createThemedStyles(({ backdropOverlay }) => ({
      loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: backdropOverlay,
        justifyContent: 'center',
        paddingBottom: 30,
        // zIndex: 1000,
      },
}));

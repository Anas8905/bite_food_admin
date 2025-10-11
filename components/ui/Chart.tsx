import { useThemeColors } from '@/hooks/useThemeColors';
import { createThemedStyles } from '@/utils/styles';
import { View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { ThemedText } from '../ThemedText';
import { useOrderStore } from '@/stores/order';

export default function Chart({ period }: { period: string }): React.JSX.Element {
    const styles = useThemedStyles();
    const { accentPrimary } = useThemeColors();
    const { weeklyOrders, monthlyOrders, yearlyOrders } = useOrderStore();

    const getData = () => {
        switch (period) {
            case 'weekly':
            return weeklyOrders;
            case 'monthly':
            return monthlyOrders;
            case 'yearly':
            return yearlyOrders;
            default:
            return weeklyOrders;
        }
    };

    const customPointerConfig = {
        activatePointersOnLongPress: true,
        pointerStripColor: accentPrimary,
        pointerStripWidth: 2,
        pointerStripUptoDataPoint: true,
        pointerColor: accentPrimary,
        radius: 8,
        pointerLabelComponent: (data: { label: string; value: string; }) => {
            const firstItem = data[0];
            return (
                <View style={styles.pointerLabel}>
                    <ThemedText
                        style={styles.pointerLabelText}
                        numberOfLines={1}
                        ellipsizeMode='clip'
                    >
                        {firstItem?.value}
                    </ThemedText>
                </View>
            );
        },
    }

    return (
        <LineChart
            data={getData()}
            height={80}
            initialSpacing={20}
            xAxisThickness={0}
            yAxisThickness={0}
            thickness={3}
            color={accentPrimary}
            hideDataPoints
            hideAxesAndRules
            hideYAxisText={true}
            hideRules={true}
            xAxisLabelTextStyle={styles.xAxisLabelText}
            scrollAnimation
            isAnimated
            animateOnDataChange
            areaChart
            curved={true}
            showStripOnFocus
            startFillColor={accentPrimary}
            endFillColor={accentPrimary}
            startOpacity={0.1}
            endOpacity={0.05}
            pointerConfig={customPointerConfig}
        />
    );
}

const useThemedStyles = createThemedStyles(({ bgPrimary, textPrimary, textSecondary }) => ({
    xAxisLabelText: {
        color: textSecondary,
        fontSize: 9
    },
    pointerLabel: {
        position: 'absolute',
        bottom: 8,
        left: -10,
        padding: 4,
        borderRadius: 4,
        minWidth: 44,
        backgroundColor: textPrimary,
    },
    pointerLabelText: {
        color: bgPrimary,
        fontSize: 14,
        fontFamily: 'Sen_600SemiBold',
        textAlign: 'center',
    },
}));
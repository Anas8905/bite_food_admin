import { monthlyOrders, weeklyOrders, yearlyOrders } from '@/api/mockApi';
import { useThemeColors } from '@/hooks/useThemeColors';
import { StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

export default function Chart({ period }: { period: string }): React.JSX.Element {
    const colors = useThemeColors();

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

    return (
        <LineChart
            data={getData()}
            height={80}
            initialSpacing={20}
            xAxisThickness={0}
            yAxisThickness={0}
            thickness={3}
            color={colors.accentPrimary}
            hideDataPoints
            hideAxesAndRules
            hideYAxisText={true}
            hideRules={true}
            xAxisLabelTextStyle={{ color: colors.textSecondary, fontSize: 9 }}
            scrollAnimation
            isAnimated
            animateOnDataChange
            areaChart
            curved={true}
            showStripOnFocus
            startFillColor={colors.accentPrimary}
            endFillColor={colors.accentPrimary}
            startOpacity={0.1}
            endOpacity={0.05}
            pointerConfig={{
                activatePointersOnLongPress: true,
                pointerStripColor: '#FA4A0C',
                pointerStripWidth: 2,
                pointerStripUptoDataPoint: true,
                pointerColor: colors.accentPrimary,
                radius: 8,
                pointerLabelComponent: (data: { label: string; value: string; }) => {
                const firstItem = data[0];
                return (
                    <View style={[styles.pointerLabel, { backgroundColor: colors.textPrimary }]}>
                        <Text
                            style={{
                            color: colors.bgPrimary,
                            fontWeight: '600',
                            textAlign: 'center',
                            }}
                            numberOfLines={1}
                            ellipsizeMode='clip'
                        >
                            {firstItem?.value}
                        </Text>
                    </View>

                );
                },
            }}
        />
    );
}

const styles = StyleSheet.create({
    pointerLabel: {
        position: 'absolute',
        bottom: 8,
        left: -10,
        padding: 4,
        borderRadius: 4,
        minWidth: 44,
    },
})
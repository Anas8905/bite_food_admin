import { FlatList, Image, View } from 'react-native';
import { createThemedStyles } from '@/utils/styles';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/hooks/useThemeColors';

export default function CustomPizzaCard({
  pizzas,
  disabled = false,
}: { pizzas: Pizza[]; disabled?: boolean }): React.JSX.Element {
    const styles = useThemedStyles();
    const { accentPrimary, } = useThemeColors();

    const renderItem = ({ item }) => (
        <View style={[styles.card, disabled && { opacity: 0.2 }]}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.details}>
                <View style={styles.primeRow}>
                    <ThemedText colorName='textPrimary' style={styles.name}>{item.name}</ThemedText>
                    <ThemedText
                      colorName='textSecondary'
                      style={styles.description}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.description}
                    </ThemedText>
                </View>
                <View style={styles.row}>
                    <ThemedText colorName='textSecondary' style={styles.price}>
                        PKR {item.price || item.variations[0].price}
                    </ThemedText>
                    <View style={styles.timeContainer}>
                        <Ionicons name="time-outline" size={14} color={accentPrimary} />
                        <ThemedText colorName='accentPrimary' style={styles.time}>{item.deliveryTime} min</ThemedText>
                    </View>
                </View>
            </View>
        </View>
    );

  return (
    <FlatList
      data={pizzas}
      renderItem={renderItem}
      keyExtractor={item => String(item.id)}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      ListFooterComponent={() => (<View style={[styles.listFooter, disabled && { opacity: 0.2 }]} />)}
    />
  );
};

const useThemedStyles = createThemedStyles(({ accentPrimary, borderDark }) => ({
  card: {
    flexDirection: 'row',
    gap: 12,
  },
  image: {
    width: 52,
    height: 52,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    gap: 10,
  },
  primeRow: {
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
  },
  description: {
    fontSize: 12,
    maxWidth: '75%',
  },
  price: {
    color: accentPrimary,
    fontSize: 16,
    fontWeight: 500,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  time: {
    fontSize: 12,
  },
  listFooter: {
    height: 1,
    backgroundColor: borderDark,
    marginVertical: 12,
  },
}));

import { useThemeColors } from '@/hooks/useThemeColors';
import { createThemedStyles } from '@/utils/styles';
import { Ionicons } from '@expo/vector-icons';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import DisableUI from './DisableUI';
import { ThemedText } from './ThemedText';
import ConfigIcons from './ui/ConfigIcons';

type CustomPizzaCardProps = {
  pizzas: Pizza[];
  disabled?: boolean;
  configIconsProps?: {
    tint: string;
    bgColor: string;
    foreColor: string;
    onDisable?: () => void;
    onEnable?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
  };
};

export default function CustomPizzaCard({
  pizzas,
  disabled = false,
  configIconsProps,
}: CustomPizzaCardProps): React.JSX.Element {
    const styles = useThemedStyles();
    const { accentPrimary, } = useThemeColors();

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image
              source={typeof item.image === 'string' ? { uri: item.image } : item.image}
              style={[styles.image, (disabled || item.disabled) && { opacity: 0.2 }]}
            />
            <View style={[styles.details, (disabled || item.disabled) && { opacity: 0.2 }]}>
              <View style={styles.primeRow}>
                <View style={styles.nameRow}>
                  <ThemedText colorName='textPrimary' style={styles.name}>{item.name}</ThemedText>
                  {configIconsProps && (
                      <ConfigIcons
                        id={`pizza-${item.id}`}
                        key={item.id}
                        tint={configIconsProps.tint}
                        bgColor={configIconsProps.bgColor}
                        foreColor={configIconsProps.foreColor}
                        onDisable={configIconsProps.onDisable}
                        onEdit={configIconsProps.onEdit}
                        onDelete={configIconsProps.onDelete}
                      />
                  )}
                </View>
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
                      PKR {item.variations[0]?.price || 'N/A'}
                  </ThemedText>
                  <View style={styles.timeContainer}>
                      <Ionicons name="time-outline" size={20} color={accentPrimary} />
                      <ThemedText style={styles.time}>{item.deliveryTime} min</ThemedText>
                  </View>
              </View>
            </View>

            {/* Disable overlay */}
            {item.disabled && (
                <View style={styles.pizzaOverlay}>
                    <DisableUI
                        onPress={() => configIconsProps?.onEnable?.()}
                    />
                </View>
            )}
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
    position: 'relative',
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    gap: 20,
  },
  primeRow: {
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontFamily: 'Sen_500Medium',
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
    marginBottom: 12,
    marginTop: 6,
  },
  pizzaOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
}));

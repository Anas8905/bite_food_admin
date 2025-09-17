import { FlatList, Image, Pressable, View } from 'react-native';
import { createThemedStyles } from '@/utils/styles';
import { ThemedText } from './ThemedText';
import { useRouter } from 'expo-router';

export default function HorizontalPizzaCard({ orders, activeTab }: { orders: Order[]; activeTab: string; }): React.JSX.Element {
    const styles = useThemedStyles();
    const router = useRouter();

    const renderItem = ({ item }) => (
        <Pressable style={styles.card} onPress={() => router.navigate(`/order/${item.id}`)}>
            <Image source={item.image} style={styles.image} />

            <View style={styles.details}>
                <View style={styles.primeRow}>
                    <ThemedText colorName='textPrimary' style={styles.customer}>{item.customer}</ThemedText>
                    <ThemedText colorName='textSecondary' style={styles.orderId}>#{item.id}</ThemedText>
                </View>
                <View style={styles.row}>
                    <View style={styles.inner1st}>
                        <ThemedText
                          colorName="textPrimary"
                          style={styles.name}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {item.category} • {item.name}
                        </ThemedText>
                        <ThemedText colorName='textSecondary' style={styles.time}>{item.time}</ThemedText>
                    </View>

                    <View style={styles.inner2nd}>
                      <ThemedText colorName='textSecondary' style={styles.price}>PKR {item.price}</ThemedText>
                      {activeTab === 'ongoing' && !!item.stage && (
                        <View style={styles.stageContainer}>
                          <ThemedText colorName='accentPrimary' style={styles.stage}>{item.stage}</ThemedText>
                        </View>
                      )}
                    </View>
                </View>
            </View>
        </Pressable>
    );

  return (
    <FlatList
      data={orders}
      renderItem={renderItem}
      keyExtractor={item => String(item.id)}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => (<View style={styles.itemSeparator} />)}
      ListFooterComponent={() => (<View style={styles.listFooter} />)}
    />
  );
};

const useThemedStyles = createThemedStyles(({ accentPrimary, borderDark }) => ({
  card: {
    flexDirection: 'row',
    gap: 12,
  },
  image: {
    width: 100,
    height: 'auto',
    borderRadius: 8,
  },
  details: {
    flex: 1,
    gap: 10,
  },
  primeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  row: {
      gap: 10,
  },
  customer: {
      fontSize: 12,
      fontWeight: 500,
  },
  orderId: {
      textDecorationLine: 'underline',
      fontSize: 13,
    },
  name: {
    fontSize: 14,
    fontWeight: 500,
    maxWidth: '80%',
  },
  inner1st: {
      gap: 2,
  },
  time: {
    fontSize: 12,
  },
  inner2nd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  price: {
    color: accentPrimary,
    fontSize: 14,
    fontWeight: 700,
    alignSelf: 'flex-end',
  },
  stageContainer: {
    borderColor: accentPrimary,
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 8,
  },
  stage: {
    fontSize: 12,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: borderDark,
    marginVertical: 12,
  },
  listFooter: {
    height: 1,
    backgroundColor: borderDark,
    marginTop: 12,
  },
}));


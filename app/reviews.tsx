import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColors } from "@/hooks/useThemeColors";
import { usePizzaStore } from "@/stores/pizza";
import { createThemedStyles } from "@/utils/styles";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, SafeAreaView, View } from "react-native";


export default function Reviews(): React.JSX.Element {
    const styles = useThemedStyles();
    const { tint } = useThemeColors();
    const { reviews } = usePizzaStore();

    const renderStars = (rating: number, tint: string) => {
        const stars: React.JSX.Element[] = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        for (let i = 0; i < fullStars; i++) {
          stars.push(<FontAwesome key={`full-${i}`} name="star" size={14} color={tint} />);
        }
        if (hasHalfStar) {
          stars.push(<FontAwesome key="half" name="star-half-empty" size={14} color={tint} />);
        }
        for (let i = 0; i < emptyStars; i++) {
          stars.push(<FontAwesome key={`empty-${i}`} name="star-o" size={14} color={tint} />);
        }

        return stars;
      };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ThemedView style={styles.container} colorName="bgPrimary">
                <FlatList
                    data={reviews}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 16 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            {/* Avatar */}
                            <View style={styles.avatarRow}>
                                <Image source={item.avatar} style={styles.avatar} />
                                <ThemedText style={styles.username}>{item.customer}</ThemedText>
                                <ThemedText colorName="textTertiary" style={styles.date}>
                                    {item.date}
                                </ThemedText>
                            </View>

                            <View style={styles.mainContent}>
                                <ThemedText style={styles.title}>{item.title}</ThemedText>
                                <View style={styles.ratingContainer}>
                                    <ThemedText style={styles.rating}>{item.rating}</ThemedText>
                                    <View style={styles.starsContainer}>
                                        {renderStars(item.rating, tint)}
                                    </View>
                                </View>
                            </View>

                            <ThemedText colorName="textSecondary" style={styles.description}>
                                {item.description}
                            </ThemedText>
                        </View>
                    )}
                    ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                />
            </ThemedView>
        </SafeAreaView>
    )
}

const useThemedStyles = createThemedStyles(({ bgPrimary, bgSecondary }) => ({
    safeArea: {
        flex: 1,
        backgroundColor: bgPrimary,
    },
    container: {
        flex: 1,
        backgroundColor: bgPrimary,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    card: {
        padding: 16,
        borderRadius: 8,
        gap: 12,
        backgroundColor: bgSecondary,
    },
    avatarRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    username: {
        fontSize: 14,
        fontWeight: '600',
    },
    date: {
        fontSize: 12,
    },
    mainContent: {
        gap: 6,
        marginTop: 4,
    },
    title: {
        fontSize: 14.5,
        fontWeight: 700,
    },
    ratingContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    rating: {
        fontSize: 14,
    },
    starsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    description: {
        fontSize: 12,
    },

}));
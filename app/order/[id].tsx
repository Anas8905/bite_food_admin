import { ThemedText } from "@/components/ThemedText";
import { useAlert } from "@/hooks/useAlert";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useOrderStore } from "@/stores/order";
import { createThemedStyles } from "@/utils/styles";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function OrderDetails(): React.JSX.Element {
    const styles = useThemedStyles();
    const { id: orderId } = useLocalSearchParams<{ id: string }>();
    const {
        getOrderById,
        acceptOrder,
        cancelOrder,
        markOrderReadyForDelivery,
        markOrderAsDelivered,
    } = useOrderStore();
    const { textSecondary, accentPrimary } = useThemeColors();
    const { showAlert } = useAlert();
    const router = useRouter();

    const [isAccepting, setIsAccepting] = useState<boolean>(false);
    const [isCancelling, setIsCancelling] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const order = orderId ? getOrderById(orderId) : null;

    const handleAcceptOrder = useCallback(async () => {
        if (!orderId) return;

        setIsAccepting(true);
        try {
            const success = await acceptOrder(orderId);
            if (success) {
                showAlert("Success", "Order has been accepted and is now being prepared.");
            } else {
                showAlert("Error", "Failed to accept the order. Please try again.");
            }
        } catch (error) {
            console.error('Error accepting order:', error);
            showAlert("Error", "An error occurred while accepting the order.");
        } finally {
            setIsAccepting(false);
        }
    }, [orderId, acceptOrder, showAlert]);

    const handleCancelOrder = useCallback(async () => {
        if (!orderId) return;

        setIsCancelling(true);
        try {
            const success = await cancelOrder(orderId);
            if (success) {
                showAlert("Success", "Order has been cancelled.", [
                    {
                        text: "OK",
                        onPress: () => router.back()
                    }
                ]);
            } else {
                showAlert("Error", "Failed to cancel the order. Please try again.");
            }
        } catch (error) {
            console.error('Error cancelling order:', error);
            showAlert("Error", "An error occurred while cancelling the order.");
        } finally {
            setIsCancelling(false);
        }
    }, [orderId, cancelOrder, showAlert, router]);

    const handleMarkReadyForDelivery = useCallback(async () => {
        if (!orderId) return;

        setIsProcessing(true);
        try {
            const success = await markOrderReadyForDelivery(orderId);
            if (success) {
                showAlert("Success", "Order has been marked ready for delivery.");
            } else {
                showAlert("Error", "Failed to mark order ready for delivery. Please try again.");
            }
        } catch (error) {
            console.error('Error marking order ready for delivery:', error);
            showAlert("Error", "An error occurred while marking the order ready for delivery.");
        } finally {
            setIsProcessing(false);
        }
    }, [orderId, markOrderReadyForDelivery, showAlert]);

    const handleMarkAsDelivered = useCallback(async () => {
        if (!orderId) return;

        setIsProcessing(true);
        try {
            const success = await markOrderAsDelivered(orderId);
            if (success) {
                showAlert("Success", "Order has been marked as delivered.", [
                    {
                        text: "OK",
                        onPress: () => router.back()
                    }
                ]);
            } else {
                showAlert("Error", "Failed to mark order as delivered. Please try again.");
            }
        } catch (error) {
            console.error('Error marking order as delivered:', error);
            showAlert("Error", "An error occurred while marking the order as delivered.");
        } finally {
            setIsProcessing(false);
        }
    }, [orderId, markOrderAsDelivered, showAlert, router]);

    const getActionButtonConfig = useCallback(() => {
        if (order?.stage === "preparing") {
            return {
                text: "Mark Ready for Delivery",
                handler: handleMarkReadyForDelivery,
            };
        } else if (order?.stage === "sent out") {
            return {
                text: "Mark As Delivered",
                handler: handleMarkAsDelivered,
            };
        }
        return null;
    }, [order?.stage, handleMarkReadyForDelivery, handleMarkAsDelivered]);

    const actionButtonConfig = getActionButtonConfig();

    const renderHeader = () => (
        <View style={styles.container}>
            <View style={styles.track}>
                <View style={styles.trackLeft}>
                    <ThemedText type="subtitle">#{order?.id}</ThemedText>
                    <ThemedText colorName="textSecondary" style={styles.time}>
                        {order?.time} • {order?.estimatedDeliveryTime} min
                    </ThemedText>
                </View>
                {order?.stage === "preparing" && (
                    <View style={styles.stagePill}>
                        <ThemedText style={styles.stageText}>{order?.stage?.toUpperCase()}</ThemedText>
                    </View>
                )}
            </View>

            <View style={styles.userInfo}>
                <View style={styles.iconicText}>
                    <FontAwesome5 name="user-alt" size={17} color={textSecondary} />
                    <ThemedText style={styles.customerName}>{order?.customer}</ThemedText>
                </View>
                <View style={styles.iconicText}>
                    <FontAwesome name="phone" size={20} color={textSecondary} />
                    <ThemedText>{order?.phone}</ThemedText>
                </View>
                <View style={styles.iconicText}>
                    <Ionicons name="location-sharp" size={22} color={accentPrimary} />
                    <ThemedText>{order?.deliveryAddress}</ThemedText>
                </View>
            </View>

            {order?.status === 'incoming' && (
                <View style={styles.headerActions}>
                    <TouchableOpacity
                        style={[styles.baseHeaderBtn, styles.leftHeaderBtn]}
                        onPress={handleAcceptOrder}
                        disabled={isAccepting}
                    >
                        {isAccepting ? (
                            <ActivityIndicator size={14} color="white" />
                        ) : (
                            <ThemedText style={styles.leftBtnText}>ACCEPT</ThemedText>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.baseHeaderBtn, styles.rightHeaderBtn]}
                        onPress={handleCancelOrder}
                        disabled={isCancelling}
                    >
                        {isCancelling ? (
                            <ActivityIndicator size={14} color={accentPrimary} />
                        ) : (
                            <ThemedText style={styles.rightBtnText}>CANCEL</ThemedText>
                        )}
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.ordersSection}>
                <ThemedText type="subtitle">Ordered Items</ThemedText>
            </View>
        </View>
    );

    const renderOrderItem = ({ item }) => (
        <View style={styles.orderItemCard}>
            <Image source={item.image} style={[styles.image, { height: 100 }]} />
            <View style={styles.textualData}>
                <View style={styles.head}>
                    <View style={styles.headLeft}>
                        <ThemedText
                            colorName="textPrimary"
                            style={styles.name}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {item.category} • {item.name}
                        </ThemedText>
                        <ThemedText colorName='textSecondary' style={styles.time}>Size: {item.size}</ThemedText>
                    </View>
                    <View style={styles.qtyContainer}>
                        <ThemedText colorName='accentPrimary' style={styles.quantity}>x{item.quantity}</ThemedText>
                    </View>
                </View>
                <ThemedText colorName='textSecondary' style={styles.price}>
                    PKR {item.subtotal}
                </ThemedText>
            </View>
        </View>
    );

    const renderFooter = () => (
        <View style={styles.footerContainer}>
            <View style={styles.instructContainer}>
                <Text style={styles.instructHeading}>DELIVERY INSTRUCTIONS</Text>
                <Text style={styles.instructDescription}>
                    When you reach the main entrance, turn left from the guards cabin and then the 3rd house on your left is the destination.
                </Text>
            </View>

            <View style={styles.calculations}>
                <View style={styles.row}>
                    <ThemedText style={styles.column}>Subtotal</ThemedText>
                    <ThemedText style={styles.column}>PKR {order?.total}</ThemedText>
                </View>
                <View style={styles.row}>
                    <ThemedText style={styles.column}>GST (16%)</ThemedText>
                    <ThemedText style={styles.column}>PKR 160</ThemedText>
                </View>
                <View style={styles.row}>
                    <ThemedText style={styles.column}>Delivery</ThemedText>
                    <ThemedText style={styles.column}>Free</ThemedText>
                </View>

                <View style={styles.row}>
                    <ThemedText style={styles.total}>Total</ThemedText>
                    <ThemedText style={styles.total}>
                        PKR {(order?.total ?? 0) + 160}
                    </ThemedText>
                </View>
            </View>

            {actionButtonConfig && (
                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={actionButtonConfig.handler}
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <ActivityIndicator size={19} color="white" />
                    ) : (
                        <Text style={styles.btnText}>{actionButtonConfig.text}</Text>
                    )}
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={order?.items || []}
                renderItem={renderOrderItem}
                keyExtractor={(item) => String(item.id)}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
                ItemSeparatorComponent={() => (<View style={styles.itemSeparator} />)}
            />
        </SafeAreaView>
    )
}

const useThemedStyles = createThemedStyles(({ bgPrimary, bgSecondary, accentPrimary, textPrimary, textTertiary, borderDark }) => ({
    safeArea: {
        flex: 1,
        backgroundColor: bgPrimary,
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 14,
    },
    flatListContent: {
        flexGrow: 1,
        backgroundColor: bgPrimary,
    },
    footerContainer: {
        marginHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderTopColor: borderDark,
    },
    navbar: {
        paddingVertical: 10,
    },
    track: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 4,
        marginBottom: 20,
    },
    trackLeft: {
        gap: 6,
    },
    stagePill: {
        paddingVertical: 6,
        paddingHorizontal: 17.5,
        backgroundColor: accentPrimary,
        borderRadius: 24,
        justifyContent: 'center',
        alignSelf: 'baseline',
    },
    stageText: {
        fontWeight: 600,
        fontSize: 14,
        color: 'white',
    },
    userInfo: {
        padding: 16,
        gap: 16,
        borderRadius: 20,
        backgroundColor: bgSecondary,
    },
    customerName: {
        fontWeight: 500,
        fontSize: 18,
    },
    iconicText: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    baseHeaderBtn: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 24,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
    },
    leftHeaderBtn: {
        backgroundColor: accentPrimary,
    },
    leftBtnText: {
        fontSize: 12,
        fontWeight: 700,
        color: textPrimary,
    },
    rightHeaderBtn: {
        borderColor: accentPrimary,
        borderWidth: 1,
    },
    rightBtnText: {
        fontSize: 12,
        fontWeight: 700,
        color: accentPrimary,
    },
    ordersSection: {
        marginTop: 20,
    },
    orderItemCard: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    image: {
        width: 100,
        borderRadius: 8,
    },
    textualData: {
        flex: 1,
        justifyContent: 'space-between',
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headLeft: {
        flex: 1,
        gap: 4,
    },
    qtyContainer: {
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: accentPrimary,
        alignSelf: 'baseline',
    },
    quantity: {
        fontSize: 14,
    },
    name: {
        fontSize: 14,
        fontWeight: 500,
        maxWidth: '90%',
    },
    time: {
        fontSize: 12,
    },
    price: {
        color: accentPrimary,
        fontSize: 14,
        fontWeight: 700,
    },
    instructContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#FFF3CD',
        borderRadius: 8,
        gap: 6,
    },
    instructHeading: {
        color: '#6B5200',
        fontWeight: 700,
    },
    instructDescription: {
        color: '#6B5200',
        fontFamily: 'Segoe UI',
        fontSize: 12,
    },
    calculations: {
        marginVertical: 20,
        padding: 16,
        gap: 16,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: textTertiary,
        borderRadius: 8,
    },
    row: {
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'space-between',
    },
    column: {
        fontSize: 14,
    },
    total: {
        fontWeight: 700,
    },
    actionBtn: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        backgroundColor: accentPrimary,
        alignItems: 'center',
    },
    btnText: {
        fontWeight: 700,
        fontSize: 16,
        color: 'white',
    },
    itemSeparator: {
        height: 1,
        backgroundColor: borderDark,
        marginHorizontal: 20,
      },
}))
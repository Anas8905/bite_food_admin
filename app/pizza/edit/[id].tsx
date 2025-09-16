import { ThemedView } from "@/components/ThemedView";
import { createThemedStyles } from "@/utils/styles";
import { SafeAreaView } from "react-native";
import PizzaForm from "@/components/PizzaForm";
import { useLocalSearchParams } from "expo-router";

export default function EditPizza(): React.JSX.Element {
    const { id: pizzaId } = useLocalSearchParams<{ id: string }>();
    const styles = useThemedStyles();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ThemedView style={styles.container} colorName="bgPrimary">
                <PizzaForm pizzaId={pizzaId} />
            </ThemedView>
        </SafeAreaView>
    )
}

const useThemedStyles = createThemedStyles(() => ({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
}));
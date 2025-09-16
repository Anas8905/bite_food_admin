import PizzaForm from "@/components/PizzaForm";
import { ThemedView } from "@/components/ThemedView";
import { createThemedStyles } from "@/utils/styles";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";

export default function AddPizza(): React.JSX.Element {
    const { id: categoryId } = useLocalSearchParams<{ id: string }>();
    const styles = useThemedStyles();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ThemedView style={styles.container} colorName="bgPrimary">
                <PizzaForm categoryId={categoryId} />
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
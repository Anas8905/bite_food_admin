import LocalNavbar from "@/components/LocalNavbar";
import PizzaForm from "@/components/PizzaForm";
import { ThemedView } from "@/components/ThemedView";
import { createThemedStyles } from "@/utils/styles";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native";

export default function EditPizza(): React.JSX.Element {
    const { id: pizzaId } = useLocalSearchParams<{ id: string }>();
    const styles = useThemedStyles();
    const [resetKey, setResetKey] = useState(0);

    const handleReset = () => {
      setResetKey(prev => prev + 1);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ThemedView style={styles.container} colorName="bgPrimary">
                <LocalNavbar title="EDIT ITEM" onReset={handleReset} />
                <PizzaForm pizzaId={pizzaId} resetKey={resetKey} />
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
    paddingHorizontal: 20,
  },
}));
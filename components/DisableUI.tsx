import { SimpleLineIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

export default function DisableUI({ onPress }: { onPress: () => void }): React.JSX.Element {
  return (
    <Pressable style={styles.disable} onPress={onPress}>
        <SimpleLineIcons name="lock" size={30} color="gray" />
        <ThemedText style={styles.enableText}>Press to Enable</ThemedText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    disable: {
        backgroundColor: '#F1F1F1',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        padding: 10,
    },
    enableText: {
      fontSize: 12,
      color: '#666',
    },
});
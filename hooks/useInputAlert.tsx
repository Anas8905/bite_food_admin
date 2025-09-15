import { TextInput } from "react-native";
import { useAlert } from "@/hooks/useAlert";
import { ThemedView } from '@/components/ThemedView';
import { useThemeColors } from "./useThemeColors";
import { createThemedStyles } from "@/utils/styles";

export const useInputAlert = () => {
  const styles = useThemedStyles();
  const { textMuted } = useThemeColors();
  const { showAlert } = useAlert();

  const showInputAlert = (
    title: string,
    message: string,
    {
      placeholder = "",
      onSubmit,
      onCancel,
    }: {
      placeholder?: string;
      onSubmit: (value: string) => void;
      onCancel?: () => void;
    }
  ) => {
    let value = "";

    showAlert(
      title,
      message,
      [
        { text: "Cancel", style: "cancel", onPress: onCancel },
        {
          text: "Save",
          style: "default",
          keepOpen: true,
          onPress: () => { onSubmit(value.trim()) },
        },
      ],

      <ThemedView style={styles.inputWrapper}>
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={textMuted}
            onChangeText={(text) => (value = text)}
            autoCapitalize="words"
            autoCorrect={false}
            autoFocus
            style={styles.input}
        />
    </ThemedView>
    );
  };

  return { showInputAlert };
};

const useThemedStyles = createThemedStyles(({ bgPrimary, textPrimary, borderLight }) => ({
  inputWrapper: {
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: bgPrimary,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: borderLight,
    color: textPrimary,
  },
}))
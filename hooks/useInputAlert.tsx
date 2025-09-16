import { ThemedView } from '@/components/ThemedView';
import { useAlert } from "@/hooks/useAlert";
import { createThemedStyles } from "@/utils/styles";
import { TextInput } from "react-native";
import { useThemeColors } from "./useThemeColors";

export const useInputAlert = () => {
  const styles = useThemedStyles();
  const { textMuted } = useThemeColors();
  const { showAlert } = useAlert();

  const showInputAlert = (
    title: string,
    message: string,
    {
      placeholder = "",
      submitText = "Save",
      submitStyle = "default",
      onSubmit,
      onCancel,
    }: {
      placeholder?: string;
      submitText?: string;
      submitStyle?: "default" | "cancel" | "destructive";
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
          text: submitText,
          style: submitStyle,
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
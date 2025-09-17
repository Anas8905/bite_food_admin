import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { createThemedStyles } from "@/utils/styles";
import { TextInput } from "react-native";
import { useAlert } from "./useAlert";
import { useThemeColors } from "./useThemeColors";

export const useInputAlert = (): showInputAlertProps => {
  const { textMuted } = useThemeColors();
  const styles = useThemedStyles();
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
      inputs,
    }: InputAlertOptions
  ): void => {
    const values: string[] = new Array(inputs.length).fill("");
    const setValue = (index: number, value: string) => {
      values[index] = value;
    };

    const renderInputs = () => (
      <ThemedView style={styles.inputsContainer}>
        {inputs.map((input, index) => (
          <ThemedView key={index} style={styles.inputFieldWrapper}>
            {input.label && (
              <ThemedText style={styles.inputLabel}>{input.label}</ThemedText>
            )}
            <TextInput
              placeholder={input.placeholder || placeholder}
              placeholderTextColor={textMuted}
              onChangeText={(text) => setValue(index, text)}
              autoCapitalize="words"
              autoCorrect={false}
              autoFocus={index === 0}
              style={styles.input}
            />
          </ThemedView>
        ))}
      </ThemedView>
    );

    showAlert(
      title,
      message,
      [
        { text: "Cancel", style: "cancel", onPress: onCancel },
        {
          text: submitText,
          style: submitStyle,
          keepOpen: true,
          onPress: () => { onSubmit(values.map(v => v.trim())) },
        },
      ],
      renderInputs()
    );
  };

  return { showInputAlert };
};

const useThemedStyles = createThemedStyles(({ bgPrimary, textPrimary, borderLight }) => ({
  inputWrapper: {
    paddingHorizontal: 20,
  },
  inputsContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  inputFieldWrapper: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: textPrimary,
  },
  input: {
    backgroundColor: bgPrimary,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: borderLight,
    color: textPrimary,
    fontSize: 16,
  },
}))
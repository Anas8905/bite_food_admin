import { useAlert } from "@/hooks/useAlert";
import { usePizzaStore } from "@/stores/pizza";
import { createThemedStyles } from "@/utils/styles";
import { Switch, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Checkbox } from 'expo-checkbox';
import { useThemeColors } from "@/hooks/useThemeColors";
import { useState } from "react";
import { useInputAlert } from "@/hooks/useInputAlert";

export default function DipList(): React.JSX.Element {
    const styles = useThemedStyles();
    const { accentPrimary } = useThemeColors();
    const { getCategoryById, getPizzaById } = usePizzaStore();
    const { showInputAlert } = useInputAlert();
    const { showAlert, hideAlert } = useAlert();

    const [dips, setDips] = useState([
      { id: "1", name: "BBQ Sauce", price: 200, selected: false },
      { id: "2", name: "Ketchup", price: 100, selected: false },
      { id: "3", name: "Ginger Sauce", price: 300, selected: false },
    ]);

    const [isDipExpanded, setIsDipExpanded] = useState(false);

    const addDip = () => {
      showInputAlert(
        "Add Dip",
        "",
        {
          inputs: [
            {
              label: 'Name',
              placeholder: 'BBQ Sauce',
            },
            {
              label: 'Price',
              placeholder: '60',
            },
          ],
          submitText: "Save",
          onSubmit: (values) => {
            const [name, priceStr] = values;
            const trimmedName = name.trim();
            const trimmedPrice = priceStr.trim();

            if (!trimmedName || !trimmedPrice) return;

            const price = Number(trimmedPrice);
            if (isNaN(price)) {
              return showAlert("Invalid Price", "Price must be a valid number.", [
                { text: "OK", style: "default" },
              ]);
            }

            if (
              dips.some(
                (v) =>
                  v.name.toLowerCase() === trimmedName.toLowerCase() &&
                  v.price === price
              )
            ) {
              return showAlert("Duplicate", "This variant already exists.", [
                { text: "OK", style: "default" },
              ]);
            }

            setDips((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                name: trimmedName,
                price,
                selected: false,
              },
            ]);

            hideAlert();
          },
        }
      )
    }

  return (
    <View>
      <View style={styles.dipContainer}>
        <View style={styles.dipBase}>
          <ThemedText style={styles.dipText}>Choose Dip</ThemedText>
          <Switch
            value={isDipExpanded}
            onValueChange={setIsDipExpanded}
            trackColor={{ false: "", true: accentPrimary }}
          />
        </View>

        {isDipExpanded && (
          <>
            <View style={styles.dipsList}>
              {dips.map((dip) => (
                <View key={dip.id} style={styles.checkboxContainer}>
                  <View style={styles.leftSide}>
                    <Checkbox
                      value={dip.selected}
                      onValueChange={(newValue) => {
                        setDips((prev) =>
                          prev.map((d) =>
                            d.id === dip.id ? { ...d, selected: newValue } : d
                          )
                        );
                      }}
                      color={accentPrimary}
                      style={styles.checkbox}
                    />
                    <ThemedText style={styles.checkboxLabel}>{dip.name}</ThemedText>
                  </View>
                  <ThemedText style={styles.checkboxLabel}>PKR {dip.price}</ThemedText>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.addDipBtn} onPress={addDip}>
              <ThemedText colorName="accentPrimary" style={styles.addBtnText}>Add Dip</ThemedText>
            </TouchableOpacity>
        </>
        )}
      </View>
    </View>
  )
}

const useThemedStyles = createThemedStyles(({ accentPrimary, borderDark }) => ({
  dipContainer: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: borderDark,
  },
  dipBase: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  dipsList: {
    marginVertical: 20,
    gap: 14,
  },
  dipText: {
    fontSize: 14,
    fontWeight: 500,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {

  },
  checkboxLabel: {

  },
  addDipBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: accentPrimary,
    alignSelf: 'flex-end',
  },
  addBtnText: {
    fontSize: 14,
  }

}))
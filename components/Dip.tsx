import { useThemeColors } from "@/hooks/useThemeColors";
import { createThemedStyles } from "@/utils/styles";
import { Checkbox } from 'expo-checkbox';
import { Switch, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";

export default function Dip({ dips, setDips, isExpanded, setIsExpanded, onAdd }: DipProps): React.JSX.Element {
    const styles = useThemedStyles();
    const { accentPrimary } = useThemeColors();

  return (
    <View>
      <View style={styles.dipContainer}>
        <View style={styles.dipBase}>
          <ThemedText style={styles.dipText}>Choose Dip</ThemedText>
          <Switch
            value={isExpanded}
            onValueChange={setIsExpanded}
            trackColor={{ false: "", true: accentPrimary }}
          />
        </View>

        {isExpanded && (
          <>
            <View style={styles.dipsList}>
              {dips.map((dip) => (
                <View key={dip.id} style={styles.checkboxContainer}>
                  <View style={styles.leftSide}>
                    <Checkbox
                      value={dip.selected}
                      onValueChange={(newValue) => {setDips((prev) =>
                        prev.map((d) => d.id === dip.id ? { ...d, selected: newValue } : d));
                      }}
                      color={accentPrimary}
                      style={{ width: 18, height: 18 }}
                    />
                    <ThemedText>{dip.name}</ThemedText>
                  </View>
                  <ThemedText>PKR {dip.price}</ThemedText>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.addDipBtn} onPress={onAdd}>
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
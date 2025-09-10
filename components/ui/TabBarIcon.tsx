import { View } from "react-native";
import { Colors } from "@/constants/Colors";

type TabBarIconProps = {
  Icon: React.ComponentType<{ width?: number; height?: number; color?: string }>;
  color: string;
  focused: boolean;
  colorScheme: "light" | "dark";
};

export function TabBarIcon({ Icon, color, focused, colorScheme }: TabBarIconProps): React.JSX.Element {
  return (
    <View
      style={{
        padding: 8,
        borderRadius: 50,
        backgroundColor: focused ? Colors[colorScheme].tint : "transparent",
      }}
    >
      <Icon width={20} height={20} color={color} />
    </View>
  );
}

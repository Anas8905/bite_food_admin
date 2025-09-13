import { View } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

type TabBarIconProps = {
  Icon: React.ComponentType<{ width?: number; height?: number; color?: string }>;
  color: string;
  focused: boolean;
};

export function TabBarIcon({ Icon, color, focused }: TabBarIconProps): React.JSX.Element {
  const { tint } = useThemeColors();
  return (
    <View
      style={{
        padding: 8,
        borderRadius: 50,
        backgroundColor: focused ? tint : "transparent",
      }}
    >
      <Icon width={20} height={20} color={color} />
    </View>
  );
}

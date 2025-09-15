import React, { useState } from "react";
import { View, Pressable, StyleProp, ViewStyle } from "react-native";
import ConfigIcon from '@/assets/images/config.svg';
import { AntDesign, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createThemedStyles } from "@/utils/styles";

type ConfigIconsProps = {
  tint: string;
  bgColor: string;
  foreColor: string;
  onDisable?: () => void;
  onDelete?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  dynamicIconsStyle?: StyleProp<ViewStyle>;
  toggleIconStyle?: StyleProp<ViewStyle>;
};

export default function ConfigIcons({
  tint,
  bgColor,
  foreColor,
  onDisable,
  onDelete,
  containerStyle,
  dynamicIconsStyle,
  toggleIconStyle,
}: ConfigIconsProps): React.JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const styles = useThemedStyles();

  return (
    <View style={[styles.allIcons, containerStyle]}>
      {expanded && (
        <View style={[styles.dynamicIcons, dynamicIconsStyle]}>
          <Feather name="edit" size={24} color={tint} />
          <Pressable onPress={onDisable}>
            <Ionicons name="ban-outline" size={24} color={tint} />
          </Pressable>

          <Pressable onPress={onDelete}>
            <MaterialIcons name="delete-outline" size={24} color={tint} />
          </Pressable>
        </View>
      )}

      <Pressable
        style={[styles.toggleIcon, toggleIconStyle, { backgroundColor: bgColor }]}
        onPress={() => setExpanded((prev) => !prev)}
      >
        {expanded ? (
          <AntDesign name="close" size={22} color={foreColor} />
        ) : (
          <ConfigIcon width={22} height={22} color={foreColor} />
        )}
      </Pressable>
    </View>
  );
}

const useThemedStyles = createThemedStyles(({
  borderDark,
}) => ({
    allIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        borderRadius: 8,
        borderWidth: 0.25,
        borderColor: borderDark,
      },
      dynamicIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        paddingLeft: 20,
      },
      toggleIcon: {
        padding: 9,
        borderRadius: 8,
        alignSelf: "flex-start",
      },
}));

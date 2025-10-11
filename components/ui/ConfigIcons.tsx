import ConfigIcon from '@/assets/images/config.svg';
import { useConfigIconsStore } from '@/stores/configIcons';
import { createThemedStyles } from "@/utils/styles";
import { AntDesign, Feather, FontAwesome6, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSegments } from 'expo-router';
import React from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";

type ConfigIconsProps = {
  id: string;
  tint: string;
  bgColor: string;
  foreColor: string;
  onDisable?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  dynamicIconsStyle?: StyleProp<ViewStyle>;
  toggleIconStyle?: StyleProp<ViewStyle>;
};

export default function ConfigIcons({
  id,
  tint,
  bgColor,
  foreColor,
  onDisable,
  onEdit,
  onDelete,
  containerStyle,
  dynamicIconsStyle,
  toggleIconStyle,
}: ConfigIconsProps): React.JSX.Element {
  const { isExpanded, setExpanded } = useConfigIconsStore();
  const expanded = isExpanded(id);
  const styles = useThemedStyles();
  const segments = useSegments();

  const isMenuScreen = segments[1] === "menu";

  const toggleExpanded = () => {
    setExpanded(id, !expanded);
  };

  return (
    <View style={[styles.allIcons, containerStyle, !expanded && { borderWidth: 0 }]}>
      {expanded && (
        <View style={[styles.dynamicIcons, dynamicIconsStyle]}>
          <Pressable onPress={onEdit}>
            <Feather name="edit" size={19.2} color={tint} />
          </Pressable>
          <Pressable onPress={onDisable}>
            <Ionicons name="ban-sharp" size={19} color={tint} />
          </Pressable>

          <Pressable onPress={onDelete}>
            <MaterialIcons name="delete-outline" size={21} color={tint} />
          </Pressable>
        </View>
      )}

      <Pressable
        style={[styles.toggleIcon, toggleIconStyle, isMenuScreen && { backgroundColor: bgColor }]}
        onPress={toggleExpanded}
      >
        {expanded ? (
          <AntDesign name="close" size={20} color={isMenuScreen ? foreColor : tint} />
        ) : (
          <ConfigIcon width={20} height={20} color={isMenuScreen ? foreColor : tint} />
        )}
      </Pressable>
    </View>
  );
}

const useThemedStyles = createThemedStyles(({ borderDark }) => ({
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
        padding: 8,
        borderRadius: 8,
        alignSelf: "flex-start",
      },
}));

import { SimpleLineIcons } from "@expo/vector-icons";
import { Image, Pressable, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { createThemedStyles } from "@/utils/styles";
import { useThemeColors } from "@/hooks/useThemeColors";

type UploadPhotoProps = {
    pizzaImage: PizzaImage;
    uploadImage: () => Promise<void>;
  };

export default function UploadPhoto({ pizzaImage, uploadImage }: UploadPhotoProps): React.JSX.Element {
  const styles = useThemedStyles();
  const { textSecondary } = useThemeColors();

  return (
    <View style={styles.uploadContainer}>
        <Pressable style={[styles.baseUpload, styles.upload]} onPress={uploadImage}>
            <View style={styles.iconContainer}>
                <SimpleLineIcons name="cloud-upload" size={24} color={textSecondary} />
            </View>
            <ThemedText colorName="textSecondary" style={styles.uploadText}>Upload</ThemedText>
        </Pressable>
        <View style={[styles.baseUpload, styles.preview]}>
            {pizzaImage && (
                <Image
                    source={typeof pizzaImage === 'string' ? { uri: pizzaImage } : pizzaImage}
                    style={styles.pizzaImage}
                />
            )}
        </View>
    </View>
  )
}

const useThemedStyles = createThemedStyles(({ bgGray, textMuted }) => ({
    uploadContainer: {
        flexDirection: 'row',
        gap: 14,
        },
    baseUpload: {
        width: 140,
        height: 140,
        borderRadius: 16,
    },
    upload: {
        borderWidth: 1,
        borderColor: textMuted,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    preview: {
        backgroundColor: bgGray,
        overflow: 'hidden',
    },
    pizzaImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 24,
        padding: 12,
        backgroundColor: bgGray,
    },
    uploadText: {
        fontSize: 14,
    },
}))
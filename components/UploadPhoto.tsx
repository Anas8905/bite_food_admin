import { SimpleLineIcons } from "@expo/vector-icons";
import { Image, Pressable, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { createThemedStyles } from "@/utils/styles";

type UploadPhotoProps = {
    pizzaImage: number | string | null;
    uploadImage: () => Promise<void>;
  };

export default function UploadPhoto({ pizzaImage, uploadImage }: UploadPhotoProps): React.JSX.Element {
  const styles = useThemedStyles();

  return (
    <View style={styles.uploadContainer}>
        <Pressable style={[styles.baseUpload, styles.upload]} onPress={uploadImage}>
            <View style={styles.iconContainer}>
            <SimpleLineIcons name="cloud-upload" size={24} color="textPrimary" />
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

const useThemedStyles = createThemedStyles(({ bgSecondary, borderDark }) => ({
    uploadContainer: {
        flexDirection: 'row',
        gap: 14,
        },
    baseUpload: {
        width: 140,
        height: 140,
        borderRadius: 16,
        borderWidth: 1,
    },
    upload: {
        borderColor: borderDark,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    preview: {
        backgroundColor: bgSecondary,
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
        backgroundColor: '#ECEAF5',
    },
    uploadText: {
        fontSize: 14,
    },
}))
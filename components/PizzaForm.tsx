import { Image, Pressable, TextInput, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { createThemedStyles } from "@/utils/styles";
import { useEffect, useState } from "react";
import { usePizzaStore } from "@/stores/pizza";
import { SimpleLineIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useAlert } from "@/hooks/useAlert";

export default function PizzaForm({ categoryId, pizzaId }: { categoryId?: string; pizzaId?: string; }): React.JSX.Element {
  const styles = useThemedStyles();
  const { getCategoryById, getPizzaById } = usePizzaStore();
  const { showAlert } = useAlert();

  const [categoryName, setCategoryName] = useState<string>("");
  const [pizzaName, setPizzaName] = useState<string>("");
  const [pizzaImage, setPizzaImage] = useState("");

    useEffect(() => {
      if (pizzaId) {
        const pizza = getPizzaById(pizzaId);
        if (pizza) {
          setPizzaName(pizza.name);
          setPizzaImage(pizza.image);
        }
      }
    }, [pizzaId, getPizzaById]);

    useEffect(() => {
      if (categoryId) {
        const category = getCategoryById(categoryId);
        if (category) {
          setCategoryName(category.name);
        }
      }
    }, [categoryId, getCategoryById]);

    const uploadImage = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        return showAlert(
          'Warning',
          'We need camera roll permissions to make this work!'
        );
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setPizzaImage(result.assets[0].uri);
      } else {
        return showAlert('Warning', "You did not select any image.")
      }
    };

  return (
    <View>
      {/* Header */}
      <View style={styles.header}>
          <ThemedText style={styles.label}>ITEM NAME</ThemedText>
          <TextInput
              value={pizzaName}
              onChangeText={setPizzaName}
              autoCapitalize="words"
              autoCorrect={false}
              style={styles.input}
              placeholder="Enter pizza name"
          />
      </View>

      {/* Upload and Preview Photo */}
      <View style={styles.uploadSection}>
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
    </View>
  )
}

const useThemedStyles = createThemedStyles(({ bgPrimary, bgSecondary, borderLight, borderDark, textPrimary, accentPrimary, bgGray }) => ({
  header: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 10,
    color: textPrimary,
  },
  input: {
    backgroundColor: bgPrimary,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: borderLight,
    color: textPrimary,
    fontSize: 16,
  },
  uploadSection: {
    flexDirection: 'row',
    gap: 14,
    marginHorizontal: 20,
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
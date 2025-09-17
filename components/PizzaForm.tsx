import { TextInput, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { createThemedStyles } from "@/utils/styles";
import { useEffect, useState } from "react";
import { usePizzaStore } from "@/stores/pizza";
import * as ImagePicker from 'expo-image-picker';
import { useAlert } from "@/hooks/useAlert";
import UploadPhoto from "./UploadPhoto";
import Ingredients from "./Ingredients";

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

      {/* Upload and preview image */}
      <View style={styles.uploadSection}>
        <ThemedText style={styles.label}>UPLOAD PHOTO</ThemedText>
        <UploadPhoto pizzaImage={pizzaImage} uploadImage={uploadImage}/>
      </View>

      {/* Details */}
      <View style={styles.details}>
        <ThemedText type="defaultSemiBold" colorName="textPrimary">DETAILS</ThemedText>
        <Ingredients />
      </View>
    </View>
  )
}

const useThemedStyles = createThemedStyles(({ bgPrimary, borderLight, textPrimary}) => ({
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
    paddingHorizontal: 20,
  },
  details:{
    gap: 20,
    marginTop: 30,
    marginHorizontal: 20,
  },
}))
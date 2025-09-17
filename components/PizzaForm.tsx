import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { createThemedStyles } from "@/utils/styles";
import { useEffect, useState } from "react";
import { usePizzaStore } from "@/stores/pizza";
import * as ImagePicker from 'expo-image-picker';
import { useAlert } from "@/hooks/useAlert";
import UploadPhoto from "./UploadPhoto";
import Ingredients from "./Ingredients";
import Variants from "./Variants";
import { useInputAlert } from "@/hooks/useInputAlert";
import DipList from "./DipList";

export default function PizzaForm({ categoryId, pizzaId }: { categoryId?: string; pizzaId?: string; }): React.JSX.Element {
  const styles = useThemedStyles();
  const { getCategoryById, getPizzaById } = usePizzaStore();
  const { showInputAlert } = useInputAlert();
  const { showAlert, hideAlert } = useAlert();

  const [categoryName, setCategoryName] = useState<string>("");
  const [pizzaName, setPizzaName] = useState<string>("");
  const [pizzaImage, setPizzaImage] = useState("");
  const [pizzaPrice, setPizzaPrice] = useState(0);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);

    useEffect(() => {
      if (pizzaId) {
        const pizza = getPizzaById(pizzaId);
        if (pizza) {
          setPizzaName(pizza.name);
          setPizzaImage(pizza.image);

          if (pizza.variations) {
            setVariants(pizza.variations);
          } else {
            setVariants([]);
          }

          if (pizza.price) {
            setPizzaPrice(pizza.price);
          } else {
            setPizzaPrice(0);
          }
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

    const addIngredient = () => {
      showInputAlert("Add Ingredient",
        "Enter an ingredient name you want to add:", {
        inputs: [
          {
            placeholder: 'Peppers',
          },
        ],
        submitText: "Add",
        onSubmit: (values) => {
          let [name] = values;
          name = name.trim();

          if (!name) return;

          const normalized = name.toLowerCase();

          if (ingredients.some((i) => i.name.toLowerCase() === normalized)) {
            return showAlert(
              "Duplicate Ingredient",
              "The entered ingredient already exists.",
              [{ text: "OK", style: "default" }]
            );
          }

          setIngredients((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              name,
            },
          ]);

          hideAlert();
        },
      });
    };

    const addVariant = () => {
      showInputAlert("Add Variant", "", {
        inputs: [
          {
            label: "Size",
            placeholder: '12" - Large (2-3)',
          },
          {
            label: "Price",
            placeholder: "1600",
          //   keyboardType: "numeric",
          },
        ],
        submitText: "Add",
        onSubmit: (values) => {
          const [size, priceStr] = values;
          const trimmedSize = size.trim();
          const trimmedPrice = priceStr.trim();

          if (!trimmedSize || !trimmedPrice) return;

          const price = Number(trimmedPrice);
          if (isNaN(price)) {
            return showAlert("Invalid Price", "Price must be a valid number.", [
              { text: "OK", style: "default" },
            ]);
          }

          if (
            variants.some(
              (v) =>
                v.size.toLowerCase() === trimmedSize.toLowerCase() &&
                v.price === price
            )
          ) {
            return showAlert("Duplicate", "This variant already exists.", [
              { text: "OK", style: "default" },
            ]);
          }

          setVariants((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              size: trimmedSize,
              price,
            },
          ]);

          hideAlert();
        },
      });
    };

    const removeIngredient = (id: string) => {
      setIngredients((prev) => prev.filter((i) => i.id !== id))
    }

    const removeVariant = (id: string) => {
      setVariants((prev) => prev.filter((v) => v.id !== id));
    }

    const editVariant = (id: string) => {}

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
        <Ingredients
          ingredients={ingredients}
          onAdd={addIngredient}
          onDelete={removeIngredient}
        />
        <Variants
          variants={variants}
          onAdd={addVariant}
          onEdit={editVariant}
          onDelete={removeVariant}
        />
      </View>

      {/* Extras */}
      <View style={styles.details}>
        <ThemedText type="defaultSemiBold" colorName="textPrimary" style={styles.extras}>EXTRAS</ThemedText>
        <DipList />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn}>
        <ThemedText style={styles.saveBtnText}>SAVE CHANGES</ThemedText>
      </TouchableOpacity>
    </ScrollView>


  )
}

const useThemedStyles = createThemedStyles(({ bgPrimary, borderLight, textPrimary, accentPrimary }) => ({
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
  extras: {
    textAlign: 'center',
  },
  saveBtn: {
    margin: 20,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: accentPrimary,
    paddingVertical: 14,

  },
  saveBtnText: {
    fontWeight: 700,
    color: 'white',
  },
}))
import { useAlert } from "@/hooks/useAlert";
import { useInputAlert } from "@/hooks/useInputAlert";
import { usePizzaStore } from "@/stores/pizza";
import { createThemedStyles } from "@/utils/styles";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import Dip from "./Dip";
import Ingredients from "./Ingredients";
import { ThemedText } from "./ThemedText";
import UploadPhoto from "./UploadPhoto";
import Variants from "./Variants";

export default function PizzaForm({ categoryId, pizzaId, resetKey }: PizzaFormProps): React.JSX.Element {
  const styles = useThemedStyles();
  const { getPizzaById, addPizza } = usePizzaStore();
  const { showInputAlert } = useInputAlert();
  const { showAlert, hideAlert } = useAlert();
  const router = useRouter();

  const [category, setCategory] = useState<string>("");
  const [pizzaName, setPizzaName] = useState<string>("");
  const [pizzaDesc, setPizzaDesc] = useState<string>("");
  const [pizzaImage, setPizzaImage] = useState<PizzaImage>("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [dips, setDips] = useState<Dip[]>([]);
  const [isDipExpanded, setIsDipExpanded] = useState(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const resetEmpty = useCallback(() => {
    setPizzaName("");
    setPizzaDesc("");
    setPizzaImage("");
    setCategory(categoryId ?? "");
    setIngredients([]);
    setVariants([]);
    setDips([]);
    setIsDipExpanded(false);
  }, [categoryId]);

  const fillFromPizza = useCallback((pizza: Pizza) => {
    setPizzaName(pizza.name);
    setPizzaDesc(pizza.description);
    setPizzaImage(pizza.image);
    setCategory(pizza.categoryId);

    setIngredients(pizza.ingredients || []);
    setVariants(pizza.variations || []);
    setDips(pizza.dips || []);
    setIsDipExpanded(!!pizza.dips?.length);
  }, []);

  useEffect(() => {
    if (pizzaId) {
      const pizza = getPizzaById(pizzaId);
      if (pizza) {
        fillFromPizza(pizza);
      } else {
        resetEmpty();
      }
    } else {
      resetEmpty();
    }
  }, [pizzaId, categoryId, getPizzaById, resetKey, resetEmpty, fillFromPizza]);

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
      submitText: "Save",
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
        },
      ],
      submitText: "Save",
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

  const addDip = () => {
    showInputAlert(
      "Add Dip",
      "",
      {
        inputs: [
          {
            label: 'Name',
            placeholder: 'BBQ Sauce',
          },
          {
            label: 'Price',
            placeholder: '60',
          },
        ],
        submitText: "Save",
        onSubmit: (values) => {
          const [name, priceStr] = values;
          const trimmedName = name.trim();
          const trimmedPrice = priceStr.trim();

          if (!trimmedName || !trimmedPrice) return;

          const price = Number(trimmedPrice);
          if (isNaN(price)) {
            return showAlert("Invalid Price", "Price must be a valid number.", [
              { text: "OK", style: "default" },
            ]);
          }

          if (
            dips.some(
              (v) =>
                v.name.toLowerCase() === trimmedName.toLowerCase() &&
                v.price === price
            )
          ) {
            return showAlert("Duplicate", "This variant already exists.",
              [ { text: "OK", style: "default" }]
            );
          }

          setDips((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              name: trimmedName,
              price,
              selected: false,
            },
          ]);

          hideAlert();
        },
      }
    )
  }

  const removeIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((i) => i.id !== id))
  }

  const removeVariant = (id: string) => {
    setVariants((prev) => prev.filter((v) => v.id !== id));
  }

  const editVariant = (id: string) => {
    const variant = variants.find(v => v.id === id);
    if (!variant) return;

    showInputAlert("Edit Variant", "", {
      inputs: [
        {
          label: "Size",
          placeholder: '12" - Large (2-3)',
          defaultValue: variant.size,
        },
        {
          label: "Price",
          placeholder: "1600",
          defaultValue: variant.price.toString(),
        },
      ],
      submitText: "Update",
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
              v.id !== id &&
              v.size.toLowerCase() === trimmedSize.toLowerCase() &&
              v.price === price
          )
        ) {
          return showAlert("Duplicate", "This variant already exists.", [
            { text: "OK", style: "default" },
          ]);
        }

        setVariants((prev) =>
          prev.map((v) =>
            v.id === id
              ? {
                  ...v,
                  size: trimmedSize,
                  price,
                }
              : v
          )
        );

        hideAlert();
      },
    });
  }

  const saveChanges = async () => {
    if (!pizzaName.trim()) {
      return showAlert(
        "Validation Error",
        "Please enter a pizza name.",
        [{ text: "OK", style: "default" }]
      );
    }

    if (!pizzaDesc.trim()) {
      return showAlert(
        "Validation Error",
        "Please enter a brief description about pizza.",
        [{ text: "OK", style: "default" }]
      );
    }

    if (!categoryId && !category) {
      return showAlert(
        "Validation Error",
        "Category is required.",
        [{ text: "OK", style: "default" }]
      );
    }

    if (!pizzaImage) {
      return showAlert(
        "Validation Error",
        "Please upload a pizza image.",
        [{ text: "OK", style: "default" }]
      );
    }

    if(variants.length <= 0) {
      return showAlert(
        "Validation Error",
        "Atleast one variant is required.",
        [{ text: "OK", style: "default" }]
      );
    }

    const pizzaData = {
      ...(pizzaId && { id: pizzaId }),
      name: pizzaName.trim(),
      description: pizzaDesc.trim(),
      image: pizzaImage,
      categoryId: categoryId ?? category,
      ingredients,
      variations: variants,
      dips: dips.filter(dip => dip.selected),
    };

    try {
      setIsSaving(true);
      await addPizza(pizzaData);

      showAlert(
        "Success",
        pizzaId
          ? "Item updated successfully."
          : "New item added successfully.",
          [
            {
              text: "OK",
              style: "default",
              onPress: () => { router.back() },
            },
          ]

      );
    } catch (error) {
      showAlert(
        "Error",
        error instanceof Error ? error.message : "Something went wrong.",
        [{ text: "OK", style: "default" }]
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Item Name */}
      <View style={styles.itemName}>
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

      {/* Item Description */}
      <View style={styles.itemDesc}>
          <ThemedText style={styles.label}>ITEM DESCRIPTION</ThemedText>
          <TextInput
              value={pizzaDesc}
              onChangeText={setPizzaDesc}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              placeholder="Enter pizza description"
          />
      </View>

      {/* Upload and preview image */}
      <View>
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
        <Dip
          dips={dips}
          setDips={setDips}
          isExpanded={isDipExpanded}
          setIsExpanded={setIsDipExpanded}
          onAdd={addDip}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={saveChanges}>
        {isSaving ? (
          <ActivityIndicator color='white' size={20} />
        ): (
        <ThemedText style={styles.saveBtnText}>SAVE CHANGES</ThemedText>
        )}
      </TouchableOpacity>
    </ScrollView>
  )
}

const useThemedStyles = createThemedStyles(({ bgPrimary, borderLight, textPrimary, accentPrimary }) => ({
  itemName: {
    marginVertical: 20,
  },
  itemDesc: {
    marginBottom: 20,
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
  details:{
    gap: 20,
    marginTop: 30,
  },
  extras: {
    textAlign: 'center',
  },
  saveBtn: {
    marginVertical: 20,
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
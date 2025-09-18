import { Platform } from "react-native";

export const norm = (s?: string): string => (s ?? '').trim().toLowerCase();

export const isAndroid = Platform.OS === 'android';

export const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

export const capitalizeWords = (sentence: string): string => {
    return sentence
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
};

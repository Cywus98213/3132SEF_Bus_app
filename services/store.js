import { create } from "zustand";
import en from "../locales/language/en.json";
import tc from "../locales/language/tc.json";
import sc from "../locales/language/sc.json";

const translationsMap = {
  en,
  tc,
  sc,
};

const useStore = create((set) => ({
  lang: "en", // Default language
  translations: translationsMap["en"], // Default translations
  setLang: (newLang) => {
    set({ lang: newLang, translations: translationsMap[newLang] });
  },
}));

export default useStore;
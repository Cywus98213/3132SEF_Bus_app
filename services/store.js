// store.js
import { create } from "zustand";

const useStore = create((set) => ({
  lang: "en", // Default language
  setLang: (newLang) => set({ lang: newLang }), // Function to update the language
}));

export default useStore;

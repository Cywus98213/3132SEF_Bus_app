import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

interface btnProps {
  text: string;
  onPress: () => void;
}

const ModalBtn: React.FC<btnProps> = ({ text, onPress }) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      className="border-b w-full items-center justify-center rounded-md px-4 py-3"
      onPress={onPress}
    >
      <Text className="font-bold">{t(text)}</Text>
    </TouchableOpacity>
  );
};

export default ModalBtn;

const styles = StyleSheet.create({});

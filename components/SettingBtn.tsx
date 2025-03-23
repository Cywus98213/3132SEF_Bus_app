import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";

interface SettingBtn {
  onPress: () => void;
}

const SettingBtn = ({ onPress }: SettingBtn) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      onPress={onPress}
      className="px-4 py-3 justify-center items-center border-b rounded-md"
    >
      <Text className="text-2xl">{t("language")}</Text>
    </TouchableOpacity>
  );
};

export default SettingBtn;

const styles = StyleSheet.create({});

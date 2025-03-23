import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { router } from "expo-router";
import { t } from "i18next";

interface SettingTopBarProps {}
const SettingTopBar: React.FC<SettingTopBarProps> = () => {
  return (
    <View className="h-20 flex-row items-center justify-between px-5 gap-5 bg-highlight">
      <TouchableOpacity onPress={() => router.back()} className="flex-none">
        <Image source={icons.leftArrow} className="size-8" />
      </TouchableOpacity>
      <View className="flex-row items-center gap-3 grow">
        <Text
          className="text-font_secondary font-bold text-2xl"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {t("settings")}
        </Text>
      </View>
    </View>
  );
};

export default SettingTopBar;

const styles = StyleSheet.create({});

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { router } from "expo-router";

interface DetailsTopBarProps{
    orig: string,
    dest: string
}

const DetailsTopBar: React.FC<DetailsTopBarProps> = ({orig, dest}) => {
  return (
    <View className="h-20 flex-row items-center px-5">
      <TouchableOpacity onPress={() => router.back()} className="flex-1">
        <Image source={icons.leftArrow} className="size-8" />
      </TouchableOpacity>

      <View className="flex-3 flex-row justify-center items-center gap-3">
        <Text className="text-font_secondary">{orig}</Text>
        <Image source={icons.rightArrow} className="size-5" />
        <Text className="text-font_secondary">{dest}</Text>
      </View>
    </View>
  );
};

export default DetailsTopBar;

const styles = StyleSheet.create({});

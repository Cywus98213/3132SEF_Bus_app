import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { router } from "expo-router";

interface TabsTopBarProps {
  title: string;
  haveTopRightIcon: Boolean;
  onPress: () => void;
}
const TabsTopBar: React.FC<TabsTopBarProps> = ({ title, haveTopRightIcon, onPress }) => {
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
          {title}
        </Text>
      </View>
      {haveTopRightIcon ? (
        <TouchableOpacity onPress={onPress} className="flex-none">
          <Image source={icons.edit} className="size-8" />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

export default TabsTopBar;

const styles = StyleSheet.create({});

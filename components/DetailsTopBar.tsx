import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { icons } from "@/constants/icons";
import { router } from "expo-router";

interface DetailsTopBarProps{
    orig: string
    dest: string
    route: string
    bound: string
}

const DetailsTopBar: React.FC<DetailsTopBarProps> = ({orig, dest, route, bound}) => {



  return (
    <View className="h-20 flex-row items-center px-5">
      <TouchableOpacity onPress={() => router.back()} className="flex-1">
        <Image source={icons.leftArrow} className="size-8" />
      </TouchableOpacity>

      <View className="flex-row justify-center items-center gap-3 ">
        {/* <Text className="text-font_secondary" numberOfLines={1} ellipsizeMode="head">{orig}</Text> */}
        <Text className="text-font_secondary font-bold text-2xl">{route}</Text>
        <Image source={icons.rightArrow} className="size-5" />
        <Text className="text-font_secondary" numberOfLines={1} ellipsizeMode="tail">{orig}</Text>
      </View>
    </View>
  );
};

export default DetailsTopBar;

const styles = StyleSheet.create({});

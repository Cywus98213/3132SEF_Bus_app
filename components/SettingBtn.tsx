import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface SettingBtn {
  onPress: () => void;
  text: string;
}

const SettingBtn = ({ onPress, text }: SettingBtn) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="px-4 py-3 justify-center items-center border-b rounded-md"
    >
      <Text className="text-2xl">{text}</Text>
    </TouchableOpacity>
  );
};

export default SettingBtn;

const styles = StyleSheet.create({});

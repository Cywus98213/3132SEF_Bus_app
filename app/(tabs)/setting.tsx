import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import LanguageModal from "@/components/LanguageModal";
import SettingBtn from "@/components/SettingBtn";
import SettingTopBar from "@/components/SettingTopBar";

const Setting = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <SettingTopBar />
      <View className="flex-1 flex-col">
        <SettingBtn onPress={toggleModal} />
      </View>
      <LanguageModal onClose={toggleModal} visible={modalVisible} />
    </>
  );
};
export default Setting;
const styles = StyleSheet.create({});

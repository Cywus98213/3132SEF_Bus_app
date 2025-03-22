import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import TabsTopBar from "@/components/TabsTopBar";
import CustomModal from "@/components/Modal";
import LanguageModal from "@/components/LanguageModal";
import SettingBtn from "@/components/SettingBtn";

const Setting = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <TabsTopBar title="Setting" haveTopRightIcon={false} onPress={() => {}}/>
      <View className="flex-1 flex-col">
        <SettingBtn text="Language" onPress={toggleModal} />
      </View>
      <LanguageModal onClose={toggleModal} visible={modalVisible} />
    </>
  );
};
export default Setting;
const styles = StyleSheet.create({});

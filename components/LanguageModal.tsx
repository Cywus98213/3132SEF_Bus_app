import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalBtn from "./ModalBtn";
import ModalCloseBtn from "./ModalCloseBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStore from "@/services/store";

interface LangModalProps {
  visible: boolean;
  onClose: () => void;
}

const LanguageModal = ({ visible, onClose }: LangModalProps) => {
  const { lang, setLang } = useStore();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={styles.modalOverlay}
        className="flex-1 justify-center items-center "
      >
        <View className="flex-col w-4/5 gap-5 rounded-md p-5 items-center bg-primary">
          <ModalBtn onPress={() => setLang("en")} text={"English"} />
          <ModalBtn
            onPress={() => setLang("tc")}
            text={"Traditional Chinese "}
          />
          <ModalBtn onPress={() => setLang("sc")} text={"Simplified Chinese"} />
          <ModalCloseBtn text="Close" onClose={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default LanguageModal;

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
});

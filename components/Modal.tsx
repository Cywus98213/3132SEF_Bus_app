import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const CustomModal: React.FC<ModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // For Android back button
    >
      <View style={styles.modalOverlay}>
        <View className="flex-col rounded-md p-5 items-center bg-white">
          <TouchableOpacity className="">
            <Text>Add to Favourite</Text>
          </TouchableOpacity>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
});

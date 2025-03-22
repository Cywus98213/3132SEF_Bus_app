import { StyleSheet, View, Modal, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ModalBtn from "./ModalBtn";
import ModalCloseBtn from "./ModalCloseBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  stop_id: string;
  bound: string;
  route: string;
  service_type: string;
}

const CustomModal: React.FC<ModalProps> = ({
  visible,
  onClose,
  stop_id,
  bound,
  route,
  service_type,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkFavorite();
  }, [isFavorite]);

  const toggleFavorite = async (
    stop_id: string,
    route: string,
    bound: string,
  ) => {
    try {
      // Retrieve favorites from AsyncStorage
      let fav = await AsyncStorage.getItem("favorites");
      const favArr = fav ? JSON.parse(fav) : []; // Parse or initialize as empty array

      const favoriteExists = favArr.some(
        (item: { stop_id: string }) => item.stop_id === stop_id
      );
      if (favoriteExists) {
        // If the stop ID exists, remove it
        console.log("ID exists in favorites. Removing...");
        const updatedFav = favArr.filter(
          (item: { stop_id: string }) => item.stop_id !== stop_id
        ); // Remove the stop_id
        await AsyncStorage.setItem("favorites", JSON.stringify(updatedFav)); // Update AsyncStorage
        console.log("Successfully removed from favorites", stop_id);
        setIsFavorite(false);
      } else {
        // If the stop ID does not exist, add it
        console.log("ID does not exist in favorites. Adding...");
        const newFav = {
          stop_id: stop_id,
          route: route,
          bound: bound,
          service_type: service_type,
        };
        const updatedFav = [...favArr, newFav]; // Add new favorite
        await AsyncStorage.setItem("favorites", JSON.stringify(updatedFav)); // Update AsyncStorage
        console.log("Successfully added to favorites", stop_id);
        setIsFavorite(true);
      }
    } catch (err) {
      console.log("Failed to update favorites", err);
    }
  };

  const checkFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites && favorites.includes(stop_id)) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error checking favorites", error);
    }
  };

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
          <Text>Current selected ID: {stop_id}</Text>
          <ModalBtn
            onPress={() => toggleFavorite(stop_id, route, bound)}
            text={isFavorite ? "Remove from Favourite" : "Add to Favourite"}
          />
          <ModalCloseBtn text="Close" onClose={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
});

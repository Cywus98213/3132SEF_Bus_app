import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabsTopBar from "@/components/SettingTopBar";
import { useFocusEffect } from "expo-router";
import FavCard from "@/components/FavCard";
import FavTopBar from "@/components/FavTopBar";
import { t } from "i18next";

const Saved = () => {
  const [favourite, setFavourite] = useState<any[]>([]);
  const [isEdit, setIsEdit] = useState(false);

  // Function to load favorites from AsyncStorage
  const loadFavorites = async () => {
    try {
      const favData = await AsyncStorage.getItem("favorites");
      const favArr = favData ? JSON.parse(favData) : [];
      setFavourite(favArr);
    } catch (error) {
      console.error("Failed to load favorites", error);
    }
  };

  // Use useFocusEffect to load favorites when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
      setIsEdit(false);
    }, [])
  );

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const OnDeleteFav = async (stop_id: string) => {
    let fav = await AsyncStorage.getItem("favorites");
    const favArr = fav ? JSON.parse(fav) : []; // Parse or initialize as empty array

    try {
      const updatedFav = favArr.filter(
        (item: { stop_id: string }) => item.stop_id !== stop_id
      );
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFav)); // Update AsyncStorage
      loadFavorites();
    } catch (err) {
      console.log("Delete Failed :", err);
    }
  };

  return (
    <>
      <FavTopBar onPress={toggleIsEdit} />
      <View className="flex-1">
        {favourite.length > 0 ? ( // Check if the 'favourite' array has items
          <FlatList
            data={favourite}
            contentContainerStyle={{ paddingBottom: 70 }}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <FavCard
                stop_id={item.stop_id}
                stop_idx={index.toString()}
                route={item.route}
                service_type={item.service_type}
                bound={item.bound}
                isEdit={isEdit}
                OnDeleteFav={OnDeleteFav}
              />
            )}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-2xl font-bold">{t("noFavoritesFound")}</Text>
          </View>
        )}
      </View>
    </>
  );
};
export default Saved;
const styles = StyleSheet.create({});

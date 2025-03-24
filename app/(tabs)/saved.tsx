import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState, useEffect } from "react";
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
    try {
      const fav = await AsyncStorage.getItem("favorites");
      const favArr = fav ? JSON.parse(fav) : []; // Parse or initialize as empty array

      console.log("Selected stop_id:", stop_id);
      const updatedFav = favArr.filter((item: any) => item.stop_id !== stop_id);
      console.log("Before", updatedFav);

      // Update AsyncStorage
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFav));

      // Reload favorites from AsyncStorage
      loadFavorites(); // Fetch updated favorites
    } catch (err) {
      console.log("Delete Failed:", err);
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
            keyExtractor={(item) => item.stop_id}
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

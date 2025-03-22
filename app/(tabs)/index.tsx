import { FlatList, Image, Text, View } from "react-native";
import GreetingBar from "@/components/GreetingBar";
import SearchBar from "@/components/SearchBar";
import { images } from "@/constants/images";
import useFetch from "@/services/useFetch";
import { fetchRoutes } from "@/services/api";
import RouteCard from "@/components/RouteCard";
import { useCallback, useEffect, useState } from "react";
import Loading from "@/components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import useStore from "@/services/store";

export default function Index() {
  const [searchRoute, setSearchRoute] = useState("");
  const { lang, setLang } = useStore();
  const {
    data: routes,
    loading: routesLoading,
    error: routesError,
  } = useFetch(() => fetchRoutes());

  const filteredRoutes = routes?.filter(
    (item: { route: { toString: () => string } }) =>
      item.route.toString().toLowerCase().includes(searchRoute.toLowerCase())
  );

  const favouritesListInit = async () => {
    try {
      const fav = await AsyncStorage.getItem("favorites");
      fav ? fav : AsyncStorage.setItem("favourites", JSON.stringify([]));
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      favouritesListInit();
    }, [])
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <View className="flex-1 px-5">
        {routesLoading ? (
          <Loading />
        ) : routesError ? (
          <View className="flex-1 items-center justify-center">
            <Text className="font-bold">Error : {routesError?.message}</Text>
          </View>
        ) : (
          <View className="flex-1 mt-5 mx-5">
            <GreetingBar />
            <SearchBar
              value={searchRoute}
              onChangeText={setSearchRoute}
              placeHolderText="Search"
            />

            <>
              <Text className="text-2xl text-font_primary font-bold mt-5 mb-3">
                Routes:
              </Text>
              <FlatList
                data={searchRoute ? filteredRoutes : routes}
                contentContainerStyle={{ paddingBottom: 70 }}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <RouteCard
                    orig={item[`orig_${lang}`]}
                    dest={item[`dest_${lang}`]}
                    route={item.route}
                    bound={item.bound}
                    service_type={item.service_type}
                  />
                )}
              />
            </>
          </View>
        )}
      </View>
    </View>
  );
}

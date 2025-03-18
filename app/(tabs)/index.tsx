import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import GreetingBar from "@/components/GreetingBar";
import SearchBar from "@/components/SearchBar";
import { images } from "@/constants/images";
import useFetch from "@/services/useFetch";
import { fetchRoutes } from "@/services/api";
import RouteCard from "@/components/RouteCard";
import { useState } from "react";

export default function Index() {
  const [searchRoute, setSearchRoute] = useState("");
  const {
    data: routes,
    loading: routesLoading,
    error: routesError,
  } = useFetch(() => fetchRoutes());

  const filteredRoutes = routes?.filter(
    (item: { route: { toString: () => string } }) =>
      item.route.toString().toLowerCase().includes(searchRoute.toLowerCase())
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <View className="flex-1 px-5">
        {routesLoading ? (
          <ActivityIndicator
            size="large"
            color="#000000"
            className="mt-10 self-center"
          />
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
                    orig={item.orig_en}
                    dest={item.dest_en}
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

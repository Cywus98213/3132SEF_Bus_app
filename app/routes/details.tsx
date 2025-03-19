import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import React, { useEffect } from "react";
import { useSearchParams } from "expo-router/build/hooks";
import useFetch from "@/services/useFetch";
import { fetchRoutesStop } from "@/services/api";
import { images } from "@/constants/images";
import DetailsTopBar from "@/components/DetailsTopBar";
import StopLists from "@/components/StopLists";
import ListCard from "@/components/ListCard";

const RouteDetails = () => {
  const searchParams = useSearchParams();
  const boundConvert = (bound: string | null) => {
    if (bound === "O") {
      return "outbound";
    } else if (bound === "I") {
      return "inbound";
    }
  };
  const route: string = searchParams.get("route") || "";
  const bound: string = boundConvert(searchParams.get("bound")) || "";
  const service_type: string = searchParams.get("service_type") || "";
  const dest: string = searchParams.get("dest") || "";
  const orig: string = searchParams.get("orig") || "";

  const {
    data: details,
    loading: detailsLoading,
    error: detailsError,
  } = useFetch(() => fetchRoutesStop(route, bound, service_type));

  const INITIAL_REGION = {};
  
  return (
    <>
      <View className="flex-1 flex-col">
        <Image source={images.bg} className="absolute w-full z-0" />
        <DetailsTopBar orig={orig} dest={dest} route={route} bound={bound}/>
        {detailsLoading ? (
          <ActivityIndicator
            size="large"
            color="#000000"
            className="mt-10 self-center"
          />
        ) : detailsError ? (
          <View className="flex-1 items-center justify-center">
            <Text className="font-bold">Error : {detailsError?.message}</Text>
          </View>
        ) : (
          <>
            <MapView style={styles.map} provider={PROVIDER_GOOGLE}/>
            <FlatList
              data={details}
              contentContainerStyle={{ paddingBottom: 70 }}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <ListCard stop_id={item.stop} stop_idx={index.toString()} />
              )}
            />
          </>
        )}
      </View>
    </>
  );
};
export default RouteDetails;
const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 240, // Adjust the height as needed
  },
});

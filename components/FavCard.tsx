import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import useFetch from "@/services/useFetch";
import { fetchStopDetail, fetchStopETA } from "@/services/api";
import Loading from "./Loading";
import { router } from "expo-router";
import useStore from "@/services/store";
import { icons } from "@/constants/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "i18next";

interface FavCardProps {
  stop_id: string;
  stop_idx: string;
  route: string;
  service_type: string;
  bound: string;
  isEdit: boolean;
  OnDeleteFav: (stop_id: string) => void
}

const FavCard = ({
  stop_id,
  stop_idx,
  route,
  service_type,
  bound,
  isEdit,
  OnDeleteFav
}: FavCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { lang, setLang } = useStore();


  function getMinutesUntilETA(eta: string) {
    if (eta == null) {
      return "N/A";
    }

    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}([+-]\d{2}:\d{2})?$/.test(eta)) {
      throw new Error("Invalid ETA format");
    }

    // Create a new Date object using the provided ETA string
    const etaDate = new Date(eta);

    // Get the current date and time
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    //@ts-ignore
    const differenceInMilliseconds = etaDate - currentDate;

    // Convert milliseconds to minutes
    const minutesUntilETA = Math.floor(differenceInMilliseconds / (1000 * 60));

    return minutesUntilETA < 0 ? 0 : minutesUntilETA; // Return 0 if the ETA is in the past
  }

  const {
    data: stopData,
    loading: stopIsLoading,
    error: stopError,
  } = useFetch(() => fetchStopDetail(stop_id));

  const {
    data: stopETAData,
    loading: stopETAIsLoading,
    error: stopETAError,
  } = useFetch(() => fetchStopETA(stop_id, route, service_type));

  useEffect(() => {
    if (!stopIsLoading && !stopETAIsLoading) {
      setIsLoading(false);
    }
  }, [stopIsLoading, stopETAIsLoading]);

  if (isLoading) {
    return <Loading />;
  }
  if (stopError || stopETAError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="font-bold">
          Error: {stopError?.message || stopETAError?.message}
        </Text>
      </View>
    );
  }

  if (!stopData || !stopETAData) {
    return <Loading />;
  }

  const deleteFavorite = async (stop_id: string) => {
    let fav = await AsyncStorage.getItem("favorites");
    const favArr = fav ? JSON.parse(fav) : []; // Parse or initialize as empty array

    try {
      const updatedFav = favArr.filter(
        (item: { stop_id: string }) => item.stop_id !== stop_id
      ); // Remove the stop_id
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFav)); // Update AsyncStorage
    } catch (err) {
      console.log("Delete Failed :", err);
    }
  };

  const handleOnPress = (
    route: string,
    bound: string,
    service_type: string,
    orig: string,
    dest: string
  ) => {
    router.push(
      `/routes/details?route=${route}&bound=${bound}&service_type=${service_type}&dest=${dest}&orig=${orig}`
    );
  };

  return (
    <>
      <TouchableOpacity
        className={classNames(
          "flex-row justify-between px-8 py-4 gap-5 border-b items-center w-full"
        )}
        onPress={() =>
          handleOnPress(
            route,
            bound,
            service_type,
            stopETAData[0][`dest_${lang}`],
            stopData[`name_${lang}`]
          )
        }
      >
        {isEdit ? (
          <TouchableOpacity onPress={() => OnDeleteFav(stop_id)} className="mr-2">
            <Image
              source={icons.deleteIcon}
              className="size-8"
              tintColor="#DE3241"
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}

        <View className="mr-auto h-10 w-8 justify-center">
          <Text className="text-highlight font-bold text-2xl">{route}</Text>
        </View>
        <View className="justify-self-start flex-col flex-1 mr-2 gap-2">
          <View className="flex-row gap-2">
            <Text className="text-sm self-center">{t("to")}:</Text>
            <Text
              className="font-bold text-lg"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {stopETAData[0][`dest_${lang}`]}
            </Text>
          </View>

          <Text className="text-base">{stopData[`name_${lang}`]}</Text>
        </View>
        <View className="ml-auto justify-center flex-col items-center">
          <Text className="text-highlight font-extrabold text-2xl">
            {getMinutesUntilETA(stopETAData[0].eta)}
          </Text>
          <Text className="uppercase text-sm text-center">{t("mins")}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default FavCard;

const styles = StyleSheet.create({});

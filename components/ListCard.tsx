import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import useFetch from "@/services/useFetch";
import { fetchStopDetail, fetchStopETA } from "@/services/api";
import classNames from "classnames";
import Loading from "./Loading";
import CustomModal from "./Modal";
import { icons } from "@/constants/icons";
import useStore from "@/services/store";
import { t } from "i18next";

interface StopListProps {
  stop_id: string;
  stop_idx: string;
  route: string;
  service_type: string;
  bound: string;
  getTheLocation: (lat: number, long: number) => void;
  getMarkers: (lat: number, long: number, name: string) => void;
}

const ListCard = ({
  stop_id,
  stop_idx,
  route,
  service_type,
  bound,
  getTheLocation,
  getMarkers,
}: StopListProps) => {
  const [focused, setFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const { lang, setLang } = useStore();
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

  useEffect(() => {
    if (stopData) {
      getMarkers(Number(stopData.lat), Number(stopData.long), stopData.name_en);
    }
  }, [stopData]);

  const handleOnPress = (lat: number, long: number) => {
    setFocused(!focused);
    getTheLocation(lat, long);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

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

  const filterETAData = stopETAData.filter(
    (item: any) => item.dir == bound.charAt(0).toUpperCase()
  );

  const lat = stopData.lat;
  const long = stopData.long;

  return (
    <>
      <TouchableOpacity
        className={classNames(
          "flex-row justify-between px-8 py-4 gap-5 border-b items-center w-full"
        )}
        onPress={() => handleOnPress(lat, long)}
      >
        <TouchableOpacity
          onPress={toggleModal}
          className="absolute top-0 right-0"
        >
          <Image source={icons.downArrow} tintColor="#2940b1" />
        </TouchableOpacity>

        <View className="mr-auto h-10 w-8"></View>
        <View className="justify-self-start flex-col flex-1 mr-2 gap-2">
          <View className="flex-row">
            <Text className="text-sm mr-2">{stop_idx}.</Text>
            <Text className="font-bold" numberOfLines={1} ellipsizeMode="tail">
              {stopData[`name_${lang}`]}
            </Text>
          </View>

          <Text className="text-base">{t("fee")}: $3.5</Text>
          <View
            className={classNames("", {
              "display-block": focused,
              hidden: !focused,
            })}
          >
            {filterETAData.map((item: any, idx: any) => (
              <View className="flex-row gap-2 items-center" key={idx}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="text-highlight font-bold"
                >
                  {getMinutesUntilETA(item.eta)}
                </Text>
                <Text className="text-xs">{t("mins")}(s)</Text>
                <Text className="text-md">{item[`rmk_${lang}`]}</Text>
              </View>
            ))}
          </View>
        </View>
        <View className="ml-auto justify-center flex-col items-center">
          <Text className="text-highlight font-extrabold text-2xl">
            {getMinutesUntilETA(filterETAData[0].eta)}
          </Text>
          <Text className="uppercase text-sm text-center">{t("mins")}</Text>
        </View>
      </TouchableOpacity>
      <CustomModal
        visible={modalVisible}
        onClose={toggleModal}
        stop_id={stop_id}
        bound={bound}
        route={route}
        service_type={service_type}
      />
    </>
  );
};

export default ListCard;

const styles = StyleSheet.create({});

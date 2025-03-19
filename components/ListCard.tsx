import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import useFetch from "@/services/useFetch";
import { fetchStopDetail } from "@/services/api";

interface StopListProps {
  stop_id: string;
  stop_idx: string;
}

const ListCard = ({ stop_id, stop_idx }: StopListProps) => {
  const [focused, setFocused] = useState(false);
  const {
    data: stopData,
    loading: stopIsLoading,
    error: stopError,
  } = useFetch(() => fetchStopDetail(stop_id));

  if (stopIsLoading) {
    return (
      <ActivityIndicator
        size="large"
        color="#000000"
        className="mt-10 self-center"
      />
    );
  }

  if (stopError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="font-bold">Error : {stopError?.message}</Text>
      </View>
    );
  }

  if (!stopData) {
    return (
      <ActivityIndicator
        size="large"
        color="#000000"
        className="mt-10 self-center"
      />
    );
  }

  const handleOnPress = (focused: boolean) => {
    setFocused(!focused);
  }


  return (
    <TouchableOpacity className="flex-row px-8 py-4 gap-5 border-b items-center" onPress={() => handleOnPress(focused)}>
      <View className="">
        <Text>☉</Text>
      </View>
      <View className="">
        <Text className="text-2xl">{stop_idx}.</Text>
      </View>
      <View className="">
        <Text className="font-bold" numberOfLines={1} ellipsizeMode="tail" >{stopData.name_en}</Text>
        <Text className="text-base">Fee: $3.5</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListCard;

const styles = StyleSheet.create({});

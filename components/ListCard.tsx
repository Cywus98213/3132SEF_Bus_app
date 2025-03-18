import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import useFetch from "@/services/useFetch";
import { fetchStopDetail } from "@/services/api";

interface StopListProps {
  stop_id: string;
  stop_idx: string;
}

const ListCard = ({ stop_id, stop_idx }: StopListProps) => {
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

  return (
    <TouchableOpacity className="flex-row px-5 py-4 gap-5">
      <View>
        <Text>{stop_idx}.</Text>
      </View>
      <View>
        <Text>{stopData.name_en}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListCard;

const styles = StyleSheet.create({});

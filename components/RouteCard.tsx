import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { Link, useRouter } from "expo-router";

interface RouteProps {
  orig: string;
  dest: string;
  route: string;
  bound: string;
  service_type: string;
}

const RouteCard = ({ orig, dest, route, bound, service_type }: RouteProps) => {
  const router = useRouter();
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
    <TouchableOpacity
      className="flex-row items-center rounded-md p-3 px-5 mb-3 border"
      onPress={() => handleOnPress(route, bound, service_type, dest, orig)}
    >
      <Text style={styles.Route} className="text-highlight">
        {route}
      </Text>
      <View style={styles.subContainer}>
        <Text style={styles.Dest} ellipsizeMode="tail" numberOfLines={1} className="font-extrabold">
          <Text className="text-base font-normal">To:</Text> {dest}
        </Text>
        <Text style={styles.orig} ellipsizeMode="tail" numberOfLines={1} className="font-medium">
          From: {orig}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(RouteCard);

const styles = StyleSheet.create({
  subContainer: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  Route: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 24,
  },

  Dest: {
    textAlign: "left",
    fontSize: 16,
  },
  orig: {
    fontSize: 10,
  },
});

import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "expo-router/build/hooks";
import useFetch from "@/services/useFetch";
import { fetchRoutesStop } from "@/services/api";
import { images } from "@/constants/images";
import DetailsTopBar from "@/components/DetailsTopBar";
import ListCard from "@/components/ListCard";
import Loading from "@/components/Loading";
import * as Location from "expo-location";

const RouteDetails = () => {
  const searchParams = useSearchParams();
  const ZoomRatio = 0.01;
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [markers, setMarkers] = useState<
    { latitude: number; longitude: number; name: string }[]
  >([]);

  const [region, setRegion] = useState({
    latitude: 22.3964,
    longitude: 114.1098,
    latitudeDelta: ZoomRatio,
    longitudeDelta: ZoomRatio,
  });

  const boundConvert = (bound: string | null) => {
    if (bound === "O" || bound === "outbound") {
      return "outbound";
    } else if (bound === "I" || bound === "inbound") {
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

  const getTheLocation = (lat: number, long: number) => {
    if (lat && long) {
      setRegion({
        latitude: Number(lat),
        longitude: Number(long),
        latitudeDelta: ZoomRatio,
        longitudeDelta: ZoomRatio,
      });
    }
  };

  // Function to collect lat and long into the markers array
  const getMarkers = (lat: number, long: number, name: string) => {
    // Add the new marker to the existing markers array
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      {
        latitude: lat,
        longitude: long,
        name: name,
      },
    ]);
  };
  useEffect(() => {
    if (markers && details) {
      if (markers.length == details.length) {
        setRegion({
          latitude: markers[0].latitude,
          longitude: markers[0].longitude,
          latitudeDelta: ZoomRatio,
          longitudeDelta: ZoomRatio,
        });
      }
    }
  }, [markers]);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: ZoomRatio,
        longitudeDelta: ZoomRatio,
      });
    }

    getCurrentLocation();
  }, []);

  return (
    <>
      <View className="flex-1 flex-col">
        <Image source={images.bg} className="absolute w-full z-0" />
        <DetailsTopBar orig={orig} dest={dest} route={route} bound={bound} />
        {detailsLoading ? (
          <Loading />
        ) : detailsError ? (
          <View className="flex-1 items-center justify-center">
            <Text className="font-bold">Error : {detailsError?.message}</Text>
          </View>
        ) : (
          <>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={region}
              region={region}
              zoomEnabled
              showsUserLocation
              showsMyLocationButton
            >
              {markers.length > 1 && (
                <Polyline
                  coordinates={markers.map((marker) => ({
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }))}
                  strokeWidth={3}
                  strokeColor="#2940b1"
                />
              )}
              {markers.map((item: any, idx) => (
                <Marker
                  key={idx}
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }}
                  title={item.name}
                ></Marker>
              ))}
              {userLocation && (
                <Marker
                  coordinate={{
                    latitude: userLocation.coords.latitude,
                    longitude: userLocation.coords.longitude,
                  }}
                  title="Your Location"
                  pinColor="blue"
                />
              )}
            </MapView>

            <FlatList
              data={details}
              contentContainerStyle={{ paddingBottom: 70 }}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <ListCard
                  stop_id={item.stop}
                  stop_idx={index.toString()}
                  route={item.route}
                  service_type={item.service_type}
                  bound={bound}
                  getTheLocation={getTheLocation}
                  getMarkers={getMarkers}
                />
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

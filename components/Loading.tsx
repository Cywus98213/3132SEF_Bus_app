import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const Loading = () => {
  return (
    <>
      <ActivityIndicator
        size="large"
        color="#000000"
        className="mt-10 self-center"
      />
    </>
  );
};

export default Loading;

const styles = StyleSheet.create({});

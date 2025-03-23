import { Image, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants/icons";
import { t } from "i18next";

interface TabProps {
  title: string;
  focused: Boolean;
  icon: any;
}

const TabIcon: React.FC<TabProps> = ({ title, focused, icon }) => {
  if (focused) {
    return (
      <View className="flex flex-col w-full min-w-[112px] min-h-14 mt-6 items-center justify-center rounded-full">
        <Image source={icon} className="size-5" tintColor="#006ffd" />
        <Text className="font-semibold text-font_primary text-base">
          {t(title)}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex flex-col w-full items-center min-w-[112px] min-h-14 mt-6 justify-center rounded-full opacity-60 ">
      <Image source={icon} className="size-5" tintColor="#808080" />
      <Text className="font-semibold text-font_primary text-base">{t(title)}</Text>
    </View>
  );
};

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
        },
        tabBarStyle: {
          backgroundColor: "#f8f9fe",
          position: "absolute",
          overflow: "hidden",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} focused={focused} title="home" />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.save} focused={focused} title="saved" />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "setting",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.Setting} focused={focused} title="settings" />
          ),
        }}
      />
    </Tabs>
  );
};
export default _Layout;

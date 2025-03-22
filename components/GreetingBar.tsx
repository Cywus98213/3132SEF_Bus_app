import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';

const GreetingBar = () => {
  const { t } = useTranslation();

  return (
    <View className="flex-col py-5 gap-3">
      <Text className="text-primary">{t('hello')}</Text>
      <Text className="font-semibold text-primary text-3xl">
        {t('whereAreYouGoing')}
      </Text>
    </View>
  );
};

export default GreetingBar;

const styles = StyleSheet.create({});
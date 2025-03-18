import {StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GreetingBar = () => {
  return (
    <View className='flex-col py-5'>
      <Text className='text-primary'>Hello, guest!</Text>
      <Text className='font-semibold text-primary' style={styles.B_font}>Where are you going?</Text>
    </View>
  )
}

export default GreetingBar

const styles = StyleSheet.create({
    B_font: {
        fontSize: 25,
    }

})
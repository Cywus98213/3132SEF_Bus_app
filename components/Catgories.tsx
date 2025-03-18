import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CatgoryBtn from './CatgoryBtn'



const Catgories = () => {
    const catgories = ['Arrival','Journey','Timetable']
  return (
    <View className='h-14 bg-white flex-row items-center px-5 gap-5'>
      {catgories.map((item) => (
        <CatgoryBtn text={item} focused/>
      ))}
    </View>
  )
}

export default Catgories

const styles = StyleSheet.create({})
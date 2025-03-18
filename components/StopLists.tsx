import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useFetch from '@/services/useFetch';
import { fetchStopDetail } from '@/services/api';

interface StopListsProps{
  stopLists: Array<any>
}

const StopLists:React.FC<StopListsProps> = ({ stopLists }) => {
  return (
    <View className='flex-1 flex-col'>
      {stopLists.map((item) => (
        <Text>{item.stop}</Text>
      ))}
    </View>
  )
}

export default StopLists

const styles = StyleSheet.create({})
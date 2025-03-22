import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface btnProps{
    text: string;
    onPress: () => void

}


const ModalBtn:React.FC<btnProps> = ({text,onPress}) => {
  return (
    <TouchableOpacity
        className='border-b w-full items-center justify-center rounded-md px-4 py-3'
        onPress={onPress}
    >
        <Text className="font-bold">{text}</Text>
    </TouchableOpacity>
  )
}

export default ModalBtn

const styles = StyleSheet.create({})
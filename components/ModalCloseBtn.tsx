import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface CloseBtnProps{
    text: string
    onClose: () => void;
}

const ModalCloseBtn:React.FC<CloseBtnProps> = ({text, onClose}) => {
  return (
    <TouchableOpacity className='bg-highlight rounded-md px-4 py-3 w-full justify-center items-center' onPress={onClose}>
      <Text className='text-primary font-semibold text-lg'>{text}</Text>
    </TouchableOpacity>
  )
}

export default ModalCloseBtn

const styles = StyleSheet.create({})
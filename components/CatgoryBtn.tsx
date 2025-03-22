import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface BtnProps{
    text: string;
    focused: boolean;
}

const CatgoryBtn:React.FC<BtnProps> = ({text, focused}) => {
    if (focused) {
        return (
            <TouchableOpacity onPress={() => {}} className='rounded-full bg-highlight px-5 py-2'>
              <Text className='text-primary text-sm'>{text}</Text>
            </TouchableOpacity>
          )
    } 
    return (
        <TouchableOpacity onPress={() => {}} className='rounded-full bg-not_highlight px-5 py-2 opacity-50'>
              <Text className='text-primary text-sm'>{text}</Text>
            </TouchableOpacity>
    )

}

export default CatgoryBtn

const styles = StyleSheet.create({})
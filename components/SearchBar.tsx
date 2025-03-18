import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface SearchBarProps {
  placeHolderText: string,
  value: string,
  onChangeText: (text: string) => void;
}


const SearchBar = ({onChangeText,value,placeHolderText}: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <Image source={icons.search_hollow} className='size-5' resizeMode='contain' tintColor="#006ffd"/>
      <TextInput 
        onPress={() => {}}
        placeholder={placeHolderText}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#808080"
        className='flex-1'
        style={styles.inputbar}
        keyboardType='numbers-and-punctuation'
      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#F8F9FE',
    borderRadius: 15,
  },
  inputbar: {
    marginLeft: 10,
  }

})
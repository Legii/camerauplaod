import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import styles from '../assets/styles'
const Main = (props: any) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => {

      props.navigation.navigate("gallery")
    }}>
      <Text style={[styles.text, styles.title]}>Camera App</Text>
      <StatusBar style="auto" />
    </TouchableOpacity>
  )
}

export default Main
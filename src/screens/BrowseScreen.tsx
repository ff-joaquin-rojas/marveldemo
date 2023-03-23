import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Button from '../components/Button'

const BrowseScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>BrowseScreen</Text>
      <Button text='Press me' />
    </ScrollView>
  )
}

export default BrowseScreen
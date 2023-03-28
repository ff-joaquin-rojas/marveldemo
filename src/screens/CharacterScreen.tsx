import { View, Text } from 'react-native'
import React from 'react'
import useQuery from '../hooks/useQuery'
import { getCharacterDetails } from '../services/MarvelApi'
import FastImage, { Source } from 'react-native-fast-image'
import { RouteProp, useRoute } from '@react-navigation/native'
import { StackParamList } from '../navigation/ScreenStacks'
import { Character } from '../models/Character'

const CharacterScreen = () => {
  const { params } = useRoute<RouteProp<StackParamList, 'CharacterDetails'>>();
  const { id } = params;
  const { data: characterData, error, loading } = useQuery(getCharacterDetails, { id })

  if (loading) return <></>

  const { name, description, thumbnail, } = characterData?.data?.results[0] as Character

  const imageSource: Source = {
    uri: `${thumbnail?.path.replace('http', 'https')}.${thumbnail?.extension}`,
    priority: 'high',
  }

  return (
    <View>
      <FastImage
        style={{ width: '100%', height: undefined, aspectRatio: 14 / 16, }}
        source={imageSource} />
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Text>{ }</Text>
    </View>
  )
}

export default CharacterScreen
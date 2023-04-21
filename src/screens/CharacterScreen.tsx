import { View, Text } from 'react-native'
import React from 'react'
import useQuery from '../hooks/useQuery'
import { getCharacterDetails } from '../services/MarvelApi'
import FastImage from 'react-native-fast-image'
import { RouteProp, useRoute } from '@react-navigation/native'
import { StackParamList } from '../navigation/ScreenStacks'
import { Character } from '../models/Character'
import { getImageSource } from '../utils/image'

const CharacterScreen = () => {
  const { params } = useRoute<RouteProp<StackParamList, 'CharacterDetails'>>();

  const { id } = params;

  const { data: characterData, error, loading } = useQuery(getCharacterDetails, { id })

  if (loading) return <></>

  const { name, description, thumbnail, } = characterData?.data?.results[0] as Character

  const imageSource = getImageSource(thumbnail)

  return (
    <View>
      <FastImage
        style={{ width: '100%', height: undefined, aspectRatio: 14 / 16, }}
        source={imageSource} />
      <Text>{name}</Text>
      <Text>{description}</Text>
    </View>
  )
}

export default CharacterScreen
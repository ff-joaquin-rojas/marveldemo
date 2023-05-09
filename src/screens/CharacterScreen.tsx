import { Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, { useMemo } from 'react'
import useQuery from '../hooks/useQuery'
import { getCharacterDetails } from '../services/MarvelApi'
import FastImage from 'react-native-fast-image'
import { RouteProp, useRoute, useTheme } from '@react-navigation/native'
import { StackParamList } from '../navigation/ScreenStacks'
import { Character } from '../models/Character'
import { getImageSource } from '../utils/image'
import { MarvelTheme } from '../style/Palette'
import Error from '../components/Error'
import { SafeAreaView } from 'react-native-safe-area-context'

const DEFAULT_NO_DESCRIPTION = 'No description available for this character'

const CharacterScreen = () => {
  const theme = useTheme() as MarvelTheme;
  const styles = useMemo(() => createStyles(theme), [theme])
  const { params } = useRoute<RouteProp<StackParamList, 'CharacterDetails'>>();

  const { id } = params;

  const { data: characterData, error, loading } = useQuery(getCharacterDetails, { id })

  if (loading) return <ActivityIndicator size='large' color={theme.colors.primary} style={styles.loadingIndicator} />

  if (error) {
    return <Error errorMessage={error.message} />
  }

  const { name, description, thumbnail, } = characterData?.data?.results[0] as Character

  const imageSource = getImageSource(thumbnail)

  return (
    <SafeAreaView edges={['bottom']}>
      <ScrollView bounces={false}>
        <FastImage
          accessibilityRole='image'
          accessibilityLabel={`Image of ${name}`}
          style={styles.image}
          source={imageSource} />
        <Text style={styles.charTitle}>{name}</Text>
        <Text style={styles.charDescription}>{description || DEFAULT_NO_DESCRIPTION}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const createStyles = (theme: MarvelTheme) =>
  StyleSheet.create({
    loadingIndicator: {
      flex: 1,
      alignSelf: 'center',
    },
    image: {
      width: '100%',
      height: undefined,
      aspectRatio: 14 / 16,
    },
    charTitle: {
      marginVertical: theme.spacing * 1.25,
      marginHorizontal: theme.spacing * 2.5,
      textAlign: 'center',
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    charDescription: {
      marginHorizontal: theme.spacing * 2.5,
      fontSize: 18,
      textAlign: 'center',
      color: theme.text.secondary,
    },
  })

export default CharacterScreen
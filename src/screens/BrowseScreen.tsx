import { View, FlatList, StyleSheet, ListRenderItemInfo } from 'react-native'
import React, { useMemo } from 'react'
import CharacterItem from '../components/CharacterItem'
import { MarvelTheme } from '../style/Palette'
import { useTheme } from '@react-navigation/native'
import { getCharacters } from '../services/MarvelApi'
import { Character } from '../models/Character'
import useQuery from '../hooks/useQuery'
import Error from '../components/Error'

const BrowseScreen = () => {
  const theme = useTheme() as MarvelTheme;
  const styles = useMemo(() => createStyles(theme), [theme])
  const { data: charactersData, error } = useQuery(getCharacters)
  const characters = charactersData?.data?.results;

  const renderCharacter = ({ item }: ListRenderItemInfo<Character>) => <CharacterItem character={item} />

  if (error) return <View style={styles.container}>
    <Error errorMessage={error.message} />
  </View>

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        columnWrapperStyle={styles.flatlistRow}
        data={characters}
        renderItem={renderCharacter}
      />
    </View>
  )
}


const createStyles = (theme: MarvelTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 5,
    },
    flatlistRow: {
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing * 2,
      marginBottom: theme.spacing,
    }
  })

export default BrowseScreen
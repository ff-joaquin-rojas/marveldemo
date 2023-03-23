import { View, FlatList, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import Button from '../components/Button'
import CharacterItem from '../components/CharacterItem'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Character } from '../models/Character'
import { MarvelTheme } from '../style/Palette'
import { useTheme } from '@react-navigation/native'

const BrowseScreen = () => {
  const theme = useTheme() as MarvelTheme;
  const styles = useMemo(() => createStyles(theme), [theme])

  const mockedCharacters: Partial<Character>[] = [
    {
      photoUri: 'https://cdn.marvel.com/content/1x/010ant_ons_crd_05.jpg',
      name: 'Ant-man',
      realName: 'Scott Lang'
    },
    {
      photoUri: 'https://cdn.marvel.com/content/1x/317scl_ons_crd_02.jpg',
      name: 'Cassie Lang',
    },
    {
      photoUri: 'https://cdn.marvel.com/content/1x/321whv_ons_crd_02.jpg',
      name: 'The wasp',
      realName: 'Hope Van Dyne'
    },
    {
      photoUri: 'https://cdn.marvel.com/content/1x/301kng_ons_crd_01.jpg',
      name: 'Kang the conqueror',
    },
    {
      photoUri: 'https://cdn.marvel.com/content/1x/157hap_ons_crd_02.jpg',
      name: 'Hank Pym',
    },
    {
      photoUri: 'https://cdn.marvel.com/content/1x/041wjd_ons_crd_02.jpg',
      name: 'Janet Van Dyne',
    }
  ]


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 10 }}>
        <Button text='Press me' />
      </View>
      <FlatList
        numColumns={2}
        columnWrapperStyle={styles.flatlistRow}
        data={mockedCharacters}
        renderItem={({ item }) => <CharacterItem character={item} />}
      />
    </SafeAreaView>
  )
}


const createStyles = (theme: MarvelTheme) =>
  StyleSheet.create({
    flatlistRow: {
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing * 2,
      marginBottom: theme.spacing,
    }
  })

export default BrowseScreen
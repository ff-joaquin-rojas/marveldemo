import { View, Text, StyleSheet, LayoutChangeEvent, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
import { NavigationProp, useNavigation, useTheme } from '@react-navigation/native'
import { MarvelTheme } from '../style/Palette'
import FastImage, { Source } from 'react-native-fast-image'
import { Character } from '../models/Character'
import { StackParamList } from '../navigation/ScreenStacks'

const TRIANGLE_SIZE = 15;
const IMAGE_HEIGHT = 200;

interface CharacterItemProps {
    character: Partial<Character>
}

const CharacterItem = ({ character = {} }: CharacterItemProps) => {
    const theme = useTheme() as MarvelTheme;
    const styles = useMemo(() => createStyles(theme), [theme])
    const navigation = useNavigation<NavigationProp<StackParamList>>()
    const [maxWidth, setmaxWidth] = useState(0)
    const { id, name, thumbnail, comics } = character

    const imageSource: Source = {
        uri: `${thumbnail?.path.replace('http', 'https')}.${thumbnail?.extension}`,
        priority: 'high',
    }

    const measureMaxWidth = (event: LayoutChangeEvent) =>
        setmaxWidth(event.nativeEvent.layout.width)

    const navigateToCharacterDetails = () =>
        id ?
            navigation.navigate('CharacterDetails', { id })
            : console.log('Error: Id not provided');


    return (
        <TouchableOpacity onPress={navigateToCharacterDetails}>
            <FastImage
                onLayout={measureMaxWidth}
                style={styles.image}
                source={imageSource} />
            <View style={[styles.informationContainer, { maxWidth }]}>
                <Text style={styles.mainInformationText}>{name}</Text>
                <Text style={styles.secondaryInformationText}>{comics?.available} Comics available</Text>
            </View>
            <View style={styles.triangleDetail} />
        </TouchableOpacity>
    )
}

const createStyles = (theme: MarvelTheme) =>
    StyleSheet.create({
        image: {
            height: IMAGE_HEIGHT,
            width: undefined,
            aspectRatio: 14 / 16,
        },
        mainInformationText: {
            color: theme.text.primary,
            textTransform: 'uppercase',
        },
        secondaryInformationText: {
            color: theme.text.subtle,
            fontSize: 11,
            textTransform: 'uppercase',
        },
        informationContainer: {
            paddingTop: theme.spacing * 2,
            paddingHorizontal: theme.spacing * 2,
            backgroundColor: theme.background.card,
            justifyContent: 'space-between',
            height: IMAGE_HEIGHT / 2,
        },
        triangleDetail: {
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderRightWidth: TRIANGLE_SIZE,
            borderTopWidth: TRIANGLE_SIZE,
            borderTopColor: theme.background.card,
            borderRightColor: "transparent",
        },
    });

export default CharacterItem
import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import RNHaptic from "react-native-haptic-feedback";
import { MarvelTheme } from '../style/Palette'
import { useTheme } from '@react-navigation/native'

const MARVEL_NOT_FOUND_IMG = '../../assets/marvel-not-found.png'

interface ErrorProps {
    errorMessage: string
}

const Error = ({ errorMessage }: ErrorProps) => {
    const theme = useTheme() as MarvelTheme;
    const styles = useMemo(() => createStyles(theme), [theme])

    // The first time this component is loaded it will trigger a failure haptic.
    useEffect(() => {
        RNHaptic.trigger('notificationError')
    }, [])


    return (
        <View style={styles.container}>
            <Image source={require(MARVEL_NOT_FOUND_IMG)} style={styles.image} />
            <Text style={styles.userFriendlyError}>HYDRA has stolen the information from S.H.I.E.L.D database</Text>
            <Text style={styles.devError}>Dev error: {errorMessage}</Text>
        </View>
    )
}

const createStyles = (theme: MarvelTheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        image: {
            width: '100%',
            maxHeight: 400,
            height: undefined,
            aspectRatio: 9 / 13,
        },
        userFriendlyError: {
            marginHorizontal: theme.spacing * 2.5,
            fontSize: 25,
            marginTop: theme.spacing * 7,
            textAlign: 'center',
            color: theme.text.secondary,
        },
        devError: {
            marginHorizontal: theme.spacing * 2.5,
            marginTop: theme.spacing * 2.5,
            color: theme.text.secondary,
        }
    })

export default Error
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { NavigationProp, Route, RouteProp, useNavigation, useTheme } from '@react-navigation/native';
import { MarvelTheme } from '../style/Palette';
import { StackParamList } from './ScreenStacks';

interface HeaderButtonProps {
    toRoute: keyof StackParamList,
}

const HeaderButton = ({ toRoute }: HeaderButtonProps) => {
    const theme = useTheme() as MarvelTheme;
    const styles = useMemo(() => createStyles(theme), [theme])
    const navigation = useNavigation<NavigationProp<StackParamList>>()

    const navigateToRoute = () => navigation.navigate(toRoute as any)

    return (
        <TouchableOpacity onPress={navigateToRoute} >
            <Text style={styles.text}>{toRoute}</Text>
        </TouchableOpacity>
    )
}

const createStyles = (theme: MarvelTheme) =>
    StyleSheet.create({
        container: {

        },
        text: {
            color: theme.colors.primary
        }
    })

export default HeaderButton
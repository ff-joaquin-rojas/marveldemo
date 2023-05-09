import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ListRenderItemInfo } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { MarvelTheme } from '../style/Palette'
import { useTheme } from '@react-navigation/native';
import { AvailableThemes, themeContext } from '../data/themeContext';

const themes = Object.keys(AvailableThemes).map(e => e as AvailableThemes)

const SettingsScreen = () => {
    const theme = useTheme() as MarvelTheme;
    const styles = useMemo(() => createStyles(theme), [theme])
    const { theme: selectedTheme, setTheme } = useContext(themeContext);

    const renderOption = ({ item }: ListRenderItemInfo<AvailableThemes>) => (
        <TouchableOpacity onPress={() => setTheme(item)} style={[styles.option, selectedTheme === item && styles.optionEnabled]}>
            <Text style={[styles.optionText, selectedTheme === item && styles.optionTextEnabled]}>{item}</Text>
        </TouchableOpacity>
    )

    return (
        <ScrollView bounces={false} style={styles.container}>
            <Text style={styles.title}>Theme</Text>
            <FlatList bounces={false} ItemSeparatorComponent={() => <View style={styles.optionSeparator} />} style={styles.optionsContainer} horizontal data={themes} renderItem={renderOption} />
        </ScrollView>
    )
}

const createStyles = (theme: MarvelTheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            paddingVertical: theme.spacing,
            paddingHorizontal: theme.spacing,
        },
        title: {
            color: theme.text.secondary,
            fontWeight: 'bold',
            marginBottom: theme.spacing,
        },
        option: {
            borderWidth: 1.5,
            borderRadius: 20,
            paddingVertical: theme.spacing * 0.75,
            paddingHorizontal: theme.spacing,
            borderColor: theme.colors.notification,
        },
        optionText: {
            color: theme.colors.primary,
        },
        optionTextEnabled: {
            color: theme.text.primary,
        },
        optionsContainer: {
            alignSelf: 'center'
        },
        optionSeparator: {
            width: 5,
        },
        optionEnabled: {
            backgroundColor: theme.colors.notification,
        },
        flatlistRow: {
            justifyContent: 'space-between',
            paddingHorizontal: theme.spacing * 2,
            marginBottom: theme.spacing,
        },
    })

export default SettingsScreen
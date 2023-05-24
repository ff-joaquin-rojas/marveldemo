import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import React, { useMemo } from 'react'
import { MarvelTheme } from '../style/Palette'
import { useTheme } from '@react-navigation/native'

const TRIANGLE_SIZE = 15

interface ButtonProps {
  text: string
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

const Button = ({ text, onPress, style }: ButtonProps) => {
  const theme = useTheme() as MarvelTheme;
  const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, style]} activeOpacity={theme.defaultOpacity} hitSlop={theme.hitSlopInsets}>
      <View style={styles.buttonTop} />
      <View style={styles.buttonContent}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
      <View style={styles.buttonBottom} />
    </TouchableOpacity>
  )
}

const createStyles = (theme: MarvelTheme) => {
  return StyleSheet.create({
    buttonContainer: {
      alignSelf: 'flex-start',
    },
    buttonText: {
      color: theme.text.primary,
      minWidth: 70,
    },
    buttonTop: {
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderLeftWidth: TRIANGLE_SIZE,
      borderBottomWidth: TRIANGLE_SIZE,
      borderLeftColor: "transparent",
      borderRightColor: theme.colors.notification,
      borderBottomColor: theme.colors.notification,
    },
    buttonBottom: {
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderRightWidth: TRIANGLE_SIZE,
      borderTopWidth: TRIANGLE_SIZE,
      borderTopColor: theme.colors.notification,
      borderRightColor: "transparent",
    },
    buttonContent: {
      backgroundColor: theme.colors.notification,
      paddingHorizontal: theme.spacing,
      alignItems: 'center',
    }
  });
}

export default Button
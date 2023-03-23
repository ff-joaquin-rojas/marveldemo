import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight, Pressable } from 'react-native'
import React, { useMemo } from 'react'
import { SPACING } from '../style/Palette'
import { Theme, useTheme } from '@react-navigation/native'
import { Path, Svg } from 'react-native-svg'

const Button = () => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <Pressable style={styles.buttonContainer}>
        <Svg  style={{ position: 'absolute', backgroundColor: 'yellow', height: '100%', width: 100}} viewBox='0 0 50 25'>
        <Path fill='blue' stroke='#000' d="M 0 25 L 42.5 25 L 50 17.5 L 50 0 L 7.5 0 L 0 7.5 L 0 25 Z" />
        </Svg>
      <Text>Update account</Text>
    </Pressable>
  )
}

const createStyles = (theme: Theme) => {
    return StyleSheet.create({
        buttonContainer: {
            backgroundColor: 'red',
            // paddingHorizontal: SPACING * 3,
            // paddingVertical: SPACING * 1.5,
        }
    });
}

export default Button
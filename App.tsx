import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  useColorScheme,
  View,
} from 'react-native';
import RootStack from './src/navigation/ScreenStacks';
import { lightTheme, darkTheme } from './src/style/Palette'


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? darkTheme : lightTheme

  return (
    <NavigationContainer theme={theme} >
      <RootStack />
    </NavigationContainer>
  );
}


export default App;

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  useColorScheme,
  View,
} from 'react-native';
import RootStack from './src/navigation/ScreenStacks';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
  <NavigationContainer >
    <RootStack />
  </NavigationContainer>
  );
}


export default App;

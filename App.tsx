import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StatusBar,
  StatusBarStyle,
  useColorScheme,
} from 'react-native';
import { AvailableThemes, themeContext } from './src/data/themeContext';
import RootStack from './src/navigation/ScreenStacks';
import { lightTheme, darkTheme, colorBlindTheme } from './src/style/Palette'


function App(): JSX.Element {
  const [theme, setTheme] = useState(AvailableThemes.System)
  const isDarkMode = (useColorScheme() === 'dark' && theme === AvailableThemes.System) || theme === AvailableThemes.Dark;
  const colorBasedTheme = isDarkMode ? darkTheme : lightTheme
  const statusBarTheme: StatusBarStyle = isDarkMode ? 'light-content' : 'dark-content'
  const i18nBasedTheme = theme === AvailableThemes.Colorblind ? colorBlindTheme : colorBasedTheme;

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      <StatusBar animated barStyle={statusBarTheme} />
      <NavigationContainer theme={i18nBasedTheme} >
        <RootStack />
      </NavigationContainer>
    </themeContext.Provider>
  );
}


export default App;

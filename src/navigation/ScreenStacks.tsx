import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BrowseScreen from '../screens/BrowseScreen';
import CharacterScreen from '../screens/CharacterScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HeaderButton from './HeaderButton';

export type StackParamList = {
    Browse: {},
    CharacterDetails: {
        id: number
    }
    Settings: {}
}

const Stack = createNativeStackNavigator<StackParamList>();

const RootStack = () => (
    <Stack.Navigator initialRouteName='Browse' >
        <Stack.Screen
            name='Browse'
            options={{ headerRight: (props) => <HeaderButton toRoute='Settings' /> }}
            component={BrowseScreen}
        />
        <Stack.Screen
            name='CharacterDetails'
            component={CharacterScreen}
            options={{ headerTitle: 'Character Details' }}
        />
        <Stack.Screen
            name='Settings'
            component={SettingsScreen}
        />
    </Stack.Navigator>
);

export default RootStack;
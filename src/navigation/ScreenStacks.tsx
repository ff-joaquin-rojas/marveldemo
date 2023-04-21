import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BrowseScreen from '../screens/BrowseScreen';
import CharacterScreen from '../screens/CharacterScreen';

export type StackParamList = {
    Browse: {},
    CharacterDetails: {
        id: number
    }
}

const Stack = createNativeStackNavigator<StackParamList>();

const RootStack = () => (
    <Stack.Navigator initialRouteName='Browse' >
        <Stack.Screen
            name='Browse'
            options={{ headerShown: false }}
            component={BrowseScreen}
        />
        <Stack.Screen
            name='CharacterDetails'
            component={CharacterScreen}
            options={{ headerTitle: 'Character Details' }}
        />
    </Stack.Navigator>
);

export default RootStack;
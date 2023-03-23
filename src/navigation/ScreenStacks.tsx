import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BrowseScreen from '../screens/BrowseScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => { 
    return (
        <Stack.Navigator >
            <Stack.Screen
             name='Browse'
             options={{ headerShown: false }}
             component={BrowseScreen}
            />
        </Stack.Navigator>
    );
}

export default RootStack;
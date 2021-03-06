import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
// import Init from './Init';

const Stack = createStackNavigator();
const Default_Screen_Options = ({ route, navigation }) => {
  const isVisible = route.name === 'Init' ? false : true;
  return {
    headerShown: isVisible,
    headerTitle: 'News',
    headerLeft: null,
    headerTintColor: '#ffffff',
    headerStyle: { backgroundColor: '#00bfbf' },
    headerTitleStyle: { alignSelf: 'center' },
  };
};
const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Home"
    headerMode="float"
    screenOptions={Default_Screen_Options}>
    <Stack.Screen name="Home" component={HomeScreen} />
    {/* <Stack.Screen name="Init" component={Init} /> */}
  </Stack.Navigator>
);

export default StackNavigator;

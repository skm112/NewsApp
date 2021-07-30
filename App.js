/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';
import StackScreens from './src/screens/index';
import store from './src/redux/';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackScreens />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

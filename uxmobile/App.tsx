import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import the Login screen
import Login from './src/screens/Login';
import SignUp from './src/screens/Signup';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        {/* AppScreen or HomeScreen after login */}
        {/* <Stack.Screen name="App" component={AppScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

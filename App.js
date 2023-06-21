import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { Icon } from 'react-native-elements';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';

import { SafeAreaProvider } from 'react-native-safe-area-context';

enableScreens();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" options={{
      headerShown: false,
    }} component={HomeScreen} />
    <Stack.Screen name="Detail" component={DetailScreen} o />
  </Stack.Navigator>
);

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer >
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'black'
          }}
          initialRouteName="HomeStack"

        >
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              headerShown: false,
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <Icon name="home" type="font-awesome" color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{
              headerShown: false,
              tabBarLabel: 'Favorites',
              tabBarIcon: ({ color }) => (
                <Icon name="heart" type="font-awesome" color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

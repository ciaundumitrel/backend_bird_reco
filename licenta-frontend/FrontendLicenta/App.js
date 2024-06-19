import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import BirdDex from './BirdDex';
import Recording from './Recording';
import BirdDetails from "./BirdDetails";
import Profile from "./Profile";
import Friends from "./Friends";
import FriendProfile from "./FriendsProfile";
import Settings from "./Settings";
import {AuthProvider} from "./AuthContext";
import Login from "./Login";
import Signup from "./Signup";

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'BirdDex') {
            iconName = focused ? 'list-circle' : 'list-circle-outline';
          } else if (route.name === 'Recording') {
            iconName = focused ? 'mic-circle' : 'mic-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="BirdDex" component={BirdDex} />
      <Tab.Screen name="Recording" component={Recording} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
  <AuthProvider>
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen name="Profile" component={MainTabNavigator} options={{ headerShown: false }} />
        <MainStack.Screen name="BirdDetails" component={BirdDetails} options={{ title: 'Bird Details' }} />
        <MainStack.Screen name="Friends" component={Friends} options={{ title: 'Friends' }} />
        <MainStack.Screen name="FriendProfile" component={FriendProfile} options={{ title: 'Friend Profile' }} />
        <MainStack.Screen name="Settings" component={Settings} options={{ title: 'Settings' }} />
        <MainStack.Screen name="Login" component={Login} />
        <MainStack.Screen name="Signup" component={Signup} />
      </MainStack.Navigator>
    </NavigationContainer>
  </AuthProvider>
  );
}

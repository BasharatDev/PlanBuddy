import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlanProvider } from './src/context/PlanContext';
import CreatePlanScreen from './src/screens/CreatePlanScreen';
import PlanScreen from './src/screens/PlanScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PlanProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0f172a', // ✅ DARK NAVY HEADER
            },
            headerTitleStyle: {
              color: '#ffffff', // ✅ WHITE TITLE TEXT
              fontSize: 20,
              fontWeight: '600',
            },
            headerTintColor: '#fff', // ✅ BACK BUTTON WHITE
            headerShadowVisible: false, // ✅ Removes bottom border on iOS
          }}
        >
          <Stack.Screen name="Create Plan" component={CreatePlanScreen} />
          <Stack.Screen name="Plan" component={PlanScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PlanProvider>
  );
}
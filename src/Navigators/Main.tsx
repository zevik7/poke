import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeContainer } from '@/Containers'

const Tab = createBottomTabNavigator<TabStackParamList>()

export type TabStackParamList = {
  Home: undefined
}

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          tabBarStyle: { display: 'none' },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator

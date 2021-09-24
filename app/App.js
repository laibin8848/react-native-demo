import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import Setting from './components/setting'
import notificationList from './components/notification-list'
import { SplashScreen } from './components/base-views'
import CreateWS from './libs/websoket'

//create websocket client
new CreateWS()

const MainStack = createStackNavigator()
function MainStackScreen() {
  return (
    <MainStack.Navigator
      headerMode="none"
      initialRouteName="Home"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <MainStack.Screen name="Home" component={notificationList} />
      <MainStack.Screen name="Setting" component={Setting} />
    </MainStack.Navigator>
  )
}

export default () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return <SplashScreen />
  }
  return (
    <NavigationContainer>
      <MainStackScreen />
    </NavigationContainer>
  )
}
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import Setting from './components/setting'
import notificationList from './components/notification-list'
import notificationDetail from './components/notification-detail'
import { SplashScreen } from './components/base-views'
import Store from './store'
import { TouchableOpacity, StatusBar } from 'react-native'
import { SettingIcon } from './icons/Setting'

const MainStack = createStackNavigator()
function MainStackScreen({defaultScreen}) {
  return (
    <MainStack.Navigator
      initialRouteName={defaultScreen}
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <MainStack.Screen
        options={({navigation}) => ({
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#DF9F3F',
          },
          title: "消息列表",
          headerRight: () => (
            <TouchableOpacity style={{marginRight: 10}} onPress={ ()=> { navigation.navigate('Setting') } }>
              <SettingIcon size={22} />
            </TouchableOpacity>
          )
        })}
        name="Home" component={notificationList} />
      <MainStack.Screen options={{
        headerTintColor: '#fff',
        headerStyle: {
          textAlign: 'center',
          backgroundColor: '#DF9F3F',
        },
        title: "门店码设置"
      }} name="Setting" component={Setting} />
      <MainStack.Screen options={{
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#DF9F3F',
        },
        title: "消息详情"
      }} name="Detail" component={notificationDetail} />
    </MainStack.Navigator>
  )
}

export default () => {
  const [isLoading, setIsLoading] = useState(true)
  const [screen, setScreen] = useState('Setting')
  
  useEffect(()=> {
    StatusBar.setBackgroundColor('#DF9F3F')

    Store.getInstance().loadSetting().then(res=> {
      setScreen('Home')
      setIsLoading(false)
    }).catch(err=> {
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <SplashScreen />
  }
  return (
    <NavigationContainer>
      <MainStackScreen defaultScreen={screen}/>
    </NavigationContainer>
  )
}
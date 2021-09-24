import React from 'react'
import { View, Text } from 'react-native'

export function BaseCenterView ({children}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {children}
    </View>
  )
}

export function SplashScreen () {
  return (
    <BaseCenterView>
      <Text>加载中...</Text>
    </BaseCenterView>
  )
}

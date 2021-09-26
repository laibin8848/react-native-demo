import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

export function BaseCenterView ({children}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {children}
    </View>
  )
}

export function SplashScreen ({message}) {
  return (
    <BaseCenterView>
      <ActivityIndicator animating={true} color="red" size="large" />
      <Text>{message || '加载中...'}</Text>
    </BaseCenterView>
  )
}

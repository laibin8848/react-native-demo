import React from 'react'
import { BaseCenterView } from './base-views'
import { Text, Button, View } from 'react-native'
import { Options } from '../icons/Options'

export function notificationList({navigation}) {
    return (
        <BaseCenterView>
            <Text>首页</Text>
            <View style={{position: 'absolute', top: 6, right: 6, display: 'flex', flexDirection: 'row-reverse'}}
                onTouchEnd={() => {
                    navigation.navigate('Setting')
                }}
            >
                <Options size={24} fill='rgb(0, 0, 0)' />
                {/* <Button
                    title="设置"
                    onPress={() => {
                        navigation.navigate('Setting')
                    }}
                >
                </Button> */}
            </View>
        </BaseCenterView>
    )
}

export default notificationList
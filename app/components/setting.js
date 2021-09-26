import React, { useEffect, useState } from 'react'
import { BaseCenterView } from './base-views'
import { Text, Button, TextInput, View, StyleSheet, Switch, Alert, Image } from 'react-native'
import Store from '../store'
import logo from '../assets/logo.png'
import { SplashScreen } from './base-views'

const Setting = ({navigation}) => {
    const [shopId, setShopId] = useState('')
    const [watchable, setWatchable] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(()=> {
        Store.getInstance().loadSetting().then(res=> {
            setShopId(res.shopId || '')
            setLoading(false)
        })
    }, [])

    if(loading) {
        return <SplashScreen message="配置信息加载中……" />
    }

    return (
        <BaseCenterView>
            <View>
                <Image source={logo} style={{marginBottom: 20}} />
            </View>
            <View style={styles.lineView}>
                <TextInput
                    style={{ height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 4 }}
                    placeholder="请输入设备编号"
                    onChangeText={text => setShopId(text)}
                    value={shopId}
                />
            </View>
            {/* <View style={styles.lineView}>
                <Switch
                    onValueChange={() => setWatchable(previousState => !previousState)}
                    value={watchable}
                />
                <Text>通知开关</Text>
            </View> */}
            <View style={styles.lineView}>
                <Button
                    title="创建连接"
                    onPress={() => {
                        if(!shopId) {
                            Alert.alert('请输入编号！')
                            return
                        }
                        Store.getInstance().saveSetting({shopId: shopId}).then(()=> {
                            navigation.navigate('Home', { doupdate: true })
                        })
                    }}
                />
            </View>
        </BaseCenterView>
    )
}

const styles = StyleSheet.create({
    lineView: {
        width: '80%',
        marginBottom: 10
    }
})

export default Setting
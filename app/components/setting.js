import React, { useState } from 'react'
import { BaseCenterView } from './base-views'
import { Text, Button, TextInput, View, StyleSheet, Switch, Alert } from 'react-native'

const Setting = ({navigation}) => {
    const [shopId, setShopId] = useState('')
    const [watchable, setWatchable] = useState(true)

    return (
        <BaseCenterView>
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
                <Text>接收信息</Text>
            </View> */}
            <View style={styles.lineView}>
                <Button
                    title="保存设置"
                    onPress={() => {
                        if(!shopId) {
                            Alert.alert('请输入编号！')
                            return
                        }
                        navigation.navigate('Home')
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
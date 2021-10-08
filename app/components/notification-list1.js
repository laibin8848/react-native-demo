import React, { useState, useEffect, useRef } from 'react'
import { BaseCenterView } from './base-views'
import { Text, View, StyleSheet, FlatList, Dimensions, Alert, TouchableOpacity } from 'react-native'
import RobotWebSocket from '../libs/websoket'
import { SplashScreen } from './base-views'
import Store from '../store'

let socketInstance = null

export function notificationList({navigation, route}) {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [linking, setLinking] = useState(false)

    function doSetLit(data) {
        console.log('doSetLit cal', data)
        setList(oldList => [data, ...oldList])
    }
    
    function createWSLink (onMount = false) {
        setLinking(true)
        setLoading(true)
        Store.getInstance().loadSetting().then(res => {
            socketInstance = RobotWebSocket.getInstance({
                shopId: res.shopId || '',
                callBack: doSetLit
            })
            // get history list
            onMount && Store.getInstance().loadRecords().then(res=> {
                setList(res)
            }).catch(()=> {
                setList([])
            }).finally(()=> {
                setTimeout(()=> { setLoading(false) }, 10000)
            })
        }).finally(()=> {
            setTimeout(()=> { setLinking(false) }, 8000)
        })
    }

    //re-create websocket instance
    useEffect(() => {
        if(route.params && route.params.doupdate) {
            createWSLink()
        }
    }, [route])

    useEffect(() => {
        createWSLink(true)
    }, [])

    useEffect(() => {
        list.length > 0
            && Store.getInstance().saveRecords(list)//add into cache
    }, [list])

    function ListItem ({item}) {
        return (
            <TouchableOpacity style={styles.listitem} onPress={() => {
                navigation.navigate('Detail', {
                    message: item.message,
                    messageTime: item.messageTime
                }) 
            }}>
                <Text style={{flex: 1,color: '#666'}}>{
                    item.message.length >= 50 ?
                        item.message.substr(0, 50) + '...'
                        : item.message
                }</Text>
                <Text style={{flex: 1,textAlign: 'right',color: '#ccc',fontSize: 10,marginTop: 6}}>接收时间：{item.messageTime}</Text>
            </TouchableOpacity>
        )
    }

    if(linking) {
        return <SplashScreen message="正在创建连接……" />
    }

    if(loading) {
        return <SplashScreen message="历史数据加载中……" />
    }

    return (
        <BaseCenterView>
            <View style={styles.list}>
                {
                    list.length > 0 ?
                    <FlatList
                        data={list}
                        renderItem={ListItem}
                        initialNumToRender={10}
                        keyExtractor={(item) => item.messageTime}
                    /> :
                    <View><Text style={{textAlign: 'center', color: '#999', marginTop: 20}}>暂无数据~</Text></View>
                }
            </View>
        </BaseCenterView>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        width: Dimensions.get('window').width - 30,
        marginTop: 20,
        marginLeft: 8
    },
    listitem: {
        display: 'flex',
        elevation: 2,
        marginBottom: 13,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        shadowOpacity: .5,
        padding: 10,
        lineHeight: 30,
        shadowRadius: 10
    }
})

export default notificationList
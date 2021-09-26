import React, { useState, useEffect, useRef } from 'react'
import { BaseCenterView } from './base-views'
import { Text, View, StyleSheet, FlatList, Dimensions, Alert } from 'react-native'
import { RobotWebSocket } from '../libs/websoket'
import { SplashScreen } from './base-views'
import Store from '../store'
let socketInstance = null

export function notificationList({navigation, route}) {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [linking, setLinking] = useState(true)
    
    function createWSLink (onMount = false) {
        setLinking(true)
        socketInstance && socketInstance.close()//close old connect at first
        RobotWebSocket().then((res)=> {
            socketInstance = res
            res.onmessage = (e) => {
                const data = JSON.parse(e.data)
                res.notifyInstance.localNotif(data.message || '')
                setList(oldList => [data, ...oldList])
            }

            setLinking(false)
            // get history list
            onMount && Store.getInstance().loadRecords().then(res=> {
                setList(res)
                setTimeout(()=> { setLoading(false) }, 2000)
            }).catch(()=> {
                setList([])
                setTimeout(()=> { setLoading(false) }, 2000)
            })
        }).catch(res=> {
            Alert.alert(res)
        })
    }

    //re-create websocket instance
    useEffect(() => {
        if(route.params && route.params.doupdate) {
            !linking && createWSLink()
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
            <View style={styles.listitem} onTouchEnd={() => {
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
                <Text style={{flex: 1,textAlign: 'right',color: '#ccc',fontSize: 10}}>时间：{item.messageTime}</Text>
            </View>
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
                <FlatList
                    data={list}
                    renderItem={ListItem}
                    initialNumToRender={10}
                    keyExtractor={(item) => item.messageTime}
                />
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
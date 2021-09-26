import React, { useState, useEffect } from 'react'
import { BaseCenterView } from './base-views'
import { Text, View, StyleSheet, FlatList, Dimensions } from 'react-native'
import RobotWebSocket from '../libs/websoket'
import { SplashScreen } from './base-views'
import Store from '../store'
let socketInstance = null

export function notificationList({navigation, route}) {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    
    function notifyCallBack (){
        Store.getInstance().loadSetting().then(res=> {
            socketInstance = RobotWebSocket.getInstance(res.shopId)
            socketInstance.instance.onmessage = (e) => {
                const data = JSON.parse(e.data)
                socketInstance.notifyInstance.localNotif(data.message || '')
                setList(oldList => [data, ...oldList])
            }
        })
    }

    //re-create websocket instance
    useEffect(() => {
        if(route.params && route.params.doupdate) {
            // RobotWebSocket.getInstance.instance.close()
            notifyCallBack()
        }
    })

    useEffect(() => {
        notifyCallBack()
        //get history list
        Store.getInstance().loadRecords().then(res=> {
            setList(res)
            setLoading(false)
        }).catch(()=> { setList([]) })
    }, [])

    useEffect(() => {
        list.length > 0
            && Store.getInstance().saveRecords(list)//add cache
    }, [list])

    function ListItem ({item}) {
        return (
            <View style={styles.listitem} onTouchEnd={() => {
                navigation.navigate('Detail', {
                    message: item.message,
                    messageTime: item.messageTime
                }) 
            }}>
                <Text style={{flex: 1,color: '#666'}}>{item.message.substr(0, 40) + '...'}</Text>
                <Text style={{flex: 1,textAlign: 'right',color: '#ccc',fontSize: 10}}>时间：{item.messageTime}</Text>
            </View>
        )
    }

    if(loading) {
        return <SplashScreen />
    }

    return (
        <BaseCenterView>
            <View style={styles.list}>
                <FlatList
                    data={list}
                    renderItem={ListItem}
                    initialNumToRender={10}
                />
            </View>
        </BaseCenterView>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        width: Dimensions.get('window').width - 30,
        marginTop: 40,
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
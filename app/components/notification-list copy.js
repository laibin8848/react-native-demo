import React, { useState, useEffect, useRef } from 'react'
import { BaseCenterView } from './base-views'
import { Text, View, StyleSheet, FlatList, Dimensions, Alert, TouchableOpacity } from 'react-native'
import { RobotWebSocket } from '../libs/websoket'
import { SplashScreen } from './base-views'
import Store from '../store'
import BackgroundJob from 'react-native-background-job'
import NetInfo from '@react-native-community/netinfo'
import { showLogToServer } from '../libs/util'

let socketInstance = null
let keepAliveTimer = null
const backgroundJobKey = 'BackgroundJob'
let unsubscribe = null

export function notificationList({navigation, route}) {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [linking, setLinking] = useState(false)

    //use FE BE way to keep websocket alive
    function keepAlive () {
        keepAliveTimer && clearInterval(keepAliveTimer)
        keepAliveTimer = setInterval(()=> {
            // showLogToServer('timer')
            socketInstance && socketInstance.send('hi')
        }, 16000)

        try {
            function backgroundJobFun () {
                try{
                    socketInstance && socketInstance.send('hi')
                    // showLogToServer('backendjob')
                } catch(e) {
                    //
                }
            }
            BackgroundJob.register({
                jobKey: backgroundJobKey,
                job: backgroundJobFun
            })
            BackgroundJob.schedule({
                jobKey: backgroundJobKey,
                period: 16000,
                allowWhileIdle: true,
                exact: true
            }).then(()=> { 
                // console.log('BackgroundJob start')
            })
        } catch(err) {
            console.log('BackgroundJob start err')
        }
    }
    
    function createWSLink (onMount = false) {
        setLinking(true)
        if(socketInstance) {//close old connect at first
            try{
                socketInstance.close()
                socketInstance = null
            } catch(e) {
                //
            }
        }
        RobotWebSocket().then((res)=> {
            res.onmessage = (e) => {
                const data = JSON.parse(e.data)
                // console.log('onmessage', data)
                if(data.messageType) {
                    res.notifyInstance.localNotif(data.message || '')
                    setList(oldList => {
                        return [data, ...oldList]
                    })
                }
            }
            socketInstance = res
            keepAlive()
            // get history list
            onMount && Store.getInstance().loadRecords().then(res=> {
                setTimeout(()=> { setLoading(false) }, 2000)
                setList(res)
            }).catch(()=> {
                setTimeout(()=> { setLoading(false) }, 2000)
                setList([])
            })
        }).catch(res=> {
            Alert.alert(res)
        }).finally(()=> {
            setLinking(false)
        })
    }

    function handleNetChange ({isConnected}) {
        if(isConnected === true) {
    //         if(!socketInstance || (socketInstance && socketInstance.readyState != 1)) {
    //             !linking && createWSLink(true)
    //         }
        }
    }

    //re-create websocket instance
    useEffect(() => {
        if(route.params && route.params.doupdate) {
            showLogToServer('handleNetChange doupdate')
            !linking && createWSLink()
        }
    }, [route])

    useEffect(() => {
        !linking && createWSLink(true)
        !unsubscribe && (unsubscribe = NetInfo.addventListener(handleNetChange))
        return () => {
            clearInterval(keepAliveTimer)
            unsubscribe && unsubscribe()
        }
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
                <Text style={{flex: 1,textAlign: 'right',color: '#ccc',fontSize: 10,marginTop: 6}}>???????????????{item.messageTime}</Text>
            </TouchableOpacity>
        )
    }

    if(linking) {
        return <SplashScreen message="????????????????????????" />
    }

    if(loading) {
        return <SplashScreen message="???????????????????????????" />
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
                    <View><Text style={{textAlign: 'center', color: '#999', marginTop: 20}}>????????????~</Text></View>
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
import NotifService from '../notification/NotifService'
import { Platform, Alert } from 'react-native'

export default class RobotWebSocket {

  constructor(shopId) {
    this.notifyInstance = new NotifService(()=> {}, (notif)=> {
        // Alert.alert(notif.title, notif.message)
    })

    const wsUrl = `ws://10.16.153.37:30084/haidilao/webSocket/${shopId}/${Platform.constants.Serial}`
    const wsInstance = new WebSocket(`ws://10.16.153.37:30084/haidilao/webSocket/${shopId}/${Platform.constants.Serial}`)
    console.log('websocket is : ' + wsUrl, wsInstance)
    wsInstance.onopen = () => {
      this.instance.send(`连接创建，门店编号：${shopId}，客户端ID：${Platform.constants.Serial}`)
    }
    wsInstance.onerror = (e) => {
      console.log(e.message)
    }
    wsInstance.onclose = (e) => {
      console.log(e.code, e.reason)
    }
    this.instance = wsInstance
  }

  static getInstance(shopId) {
    // if(!this.instance) {
      this.instance = new RobotWebSocket(shopId)
      return this.instance
    // } else {
    //   return this.instance
    // }
  }
}
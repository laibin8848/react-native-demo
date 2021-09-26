import NotifService from '../notification/NotifService'
import { Platform, Alert } from 'react-native'
import Store from '../../store'

export const RobotWebSocket = () => {
  return new Promise((reslove, reject) => {
    Store.getInstance().loadSetting().then(res => {
      const shopId = res.shopId || ''

      const wsUrl = `ws://10.16.153.37:30084/haidilao/webSocket/${shopId}/${Platform.constants.Serial}`
      const wsInstance = new WebSocket(wsUrl)

      wsInstance.notifyInstance = new NotifService(()=> {}, (notif)=> {
          // Alert.alert(notif.title, notif.message)
      })

      console.log('websocket is : ' + wsUrl, wsInstance)
  
      wsInstance.onopen = () => {
        wsInstance.send(`连接创建，门店编号：${shopId}，客户端ID：${Platform.constants.Serial}`)
      }
      wsInstance.onerror = (e) => {
        console.log(e.message)
        // this.getInstance(shopId)
      }
      wsInstance.onclose = (e) => {
        console.log(`${shopId} socket close`, e.code, e.reason)
      }
      
      setTimeout(()=> { reslove(wsInstance) }, 1000)
    })
  })
}
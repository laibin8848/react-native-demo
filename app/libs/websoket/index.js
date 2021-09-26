import NotifService from '../notification/NotifService'
import { Platform, Alert } from 'react-native'
import Store from '../../store'
import md5 from 'js-md5'
import { getCurDate } from '../util'

export const RobotWebSocket = () => {
  return new Promise((reslove, reject) => {
    Store.getInstance().loadSetting().then(res => {
      const shopId = res.shopId || ''
      
      const wsUrl = `ws://open-api-test.gdiiyy.com/haidilao/webSocket/${shopId}/${Platform.constants.Serial}/${md5(getCurDate())}`
      const wsInstance = new WebSocket(wsUrl)

      wsInstance.notifyInstance = new NotifService(()=> {}, (notif)=> {
          // Alert.alert(notif.title, notif.message)
      })

      console.log('websocket is connect: ' + wsUrl)
  
      wsInstance.onopen = () => {
        wsInstance.send(`连接创建，门店编号：${shopId}，客户端ID：${Platform.constants.Serial}`)
      }
      wsInstance.onerror = (e) => {
        reject('连接失败')
        console.log(`socket num: ${shopId}  error`, e.message)
        // this.getInstance(shopId)
      }
      wsInstance.onclose = (e) => {
        reject('连接失败')
        console.log(`socket num: ${shopId}  close`, e.code, e.reason)
      }
      
      setTimeout(()=> { reslove(wsInstance) }, 1000)
    })
  })
}
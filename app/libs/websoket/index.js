import NotifService from '../notification/NotifService'
import { Platform, Alert } from 'react-native'
import Store from '../../store'
import md5 from 'js-md5'
import { getCurDate, showLogToServer } from '../util'

export const RobotWebSocket = () => {
  return new Promise((reslove, reject) => {
    Store.getInstance().loadSetting().then(res => {
      const shopId = res.shopId || ''
      //Platform.constants.Serial
      const wsUrl = `ws://open-api-test.gdiiyy.com/haidilao/webSocket/${shopId}/${Math.random()}/${md5(getCurDate())}`
      const wsInstance = new WebSocket(wsUrl)

      wsInstance.notifyInstance = new NotifService(()=> {}, (notif)=> {
          // Alert.alert(notif.title, notif.message)
      })

      console.log('websocket is connect: ' + wsUrl)
  
      wsInstance.onopen = () => {
        wsInstance.send(`连接创建，门店编号：${shopId}，客户端ID：${Math.random()}`)
      }
      wsInstance.onerror = (e) => {
        console.log(`socket num: ${shopId}  error`, e.message)
        showLogToServer('websocket onerror')
        reject('连接失败，请首先检查您的手机是否联网')
      }
      wsInstance.onclose = (e) => {
        console.log(`socket num: ${shopId}  close`, e.code, e.reason)
        showLogToServer('websocket onclose')
        reject('连接失败，请首先检查您的手机是否联网')
      }
      
      setTimeout(()=> { reslove(wsInstance) }, 2000)
    })
  })
}
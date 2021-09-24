import NotifService from '../notification/NotifService'
import { Platform, Alert } from 'react-native'

export default class CreateWS {
  static instance = null
  static notifyInstance = null
  static shopId = 1111

  constructor() {
    if(!this.notifyInstance) {
      this.notifyInstance = new NotifService(()=> {}, (notif)=> {
          Alert.alert(notif.title, notif.message)
      })
    }
    if(!this.instance) {
      console.log('create sw')
      this.instance = new WebSocket(`ws://172.20.39.139:8080/haidilao/webSocket/${this.shopId}/${Platform.constants.Serial}`)

      this.instance.onopen = () => {
        this.instance.send(`连接创建，门店编号：${this.shopId}，客户端ID：${Platform.constants.Serial}`)
      }
      
      this.instance.onmessage = (e) => {
        this.notifyInstance.localNotif(e.data)
      }
      
      this.instance.onerror = (e) => {
        console.log(e.message)
      }
      
      this.instance.onclose = (e) => {
        console.log(e.code, e.reason)
      }
    }
  }
}
import NotifService from '../notification/NotifService'
import { Platform } from 'react-native'
import md5 from 'js-md5'
import { getCurDate, showLogToServer } from '../util'
import BackgroundJob from 'react-native-background-job'

const backgroundJobKey = 'BackgroundJob'
const maxReconnectNum = 3000
let that = null
let reconnectNum = 0
let reconnectTimer = null

export default class RobotWebSocket {

  constructor({shopId, callBack}) {
    console.log('constructor cal')
    this.callBack = callBack
    this.shopId = shopId
    this.ws = this.initWs()
    this.notifyInstance = new NotifService(()=> {}, (notif)=> {
      //Alert.alert(notif.title, notif.message)
    })
    that = this
  }

  static getInstance({shopId, callBack}) {
    if(this.instance && this.instance.shopId !== shopId) {
      this.instance = new RobotWebSocket({shopId, callBack})
    }
    if(!this.instance) {
      this.instance = new RobotWebSocket({shopId, callBack})
    }
    return this.instance
  }

  initEvent() {
    this.ws.onopen = () => {
      reconnectTimer && clearInterval(reconnectTimer)
      showLogToServer('websocket_onopen')
      that.setTimer(that.ws)
      that.setBackgroundJob(that.ws)
    }

    this.ws.onerror = (e) => {
      showLogToServer('websocket_onerror')
      reconnectTimer && clearInterval(reconnectTimer)
      reconnectTimer = setInterval(() => {
        that.reconnect()
      }, 60000)
    }

    this.ws.onclose = (e) => {
      showLogToServer('websocket_onclose')
    }

    this.ws.onmessage = (e) => {
        const data = JSON.parse(e.data)
        showLogToServer('websocket_onmessage')
        if(data.messageType) {
          that.notifyInstance.localNotif(data.message || '')
          that.callBack && that.callBack(data)
        }
    }
  }

  setBackgroundJob(wsInstance) {
      try {
        function backgroundJobFun () {
          try{
            wsInstance && wsInstance.send('hi')
            showLogToServer('backendjob')
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
            console.log('BackgroundJob start')
        })
      } catch(err) {
        console.log('BackgroundJob start err')
      }
  }

  setTimer(wsInstance) {
    this.keepAliveTimer = setInterval(()=> {
        showLogToServer('timer')
        wsInstance && wsInstance.send('hi')
    }, 16000)
  }

  initWs() {
    try {
      const wsUrl = `ws://open-api-test.gdiiyy.com/haidilao/webSocket/${this.shopId}/${Math.random()}/${md5(getCurDate())}`
      this.keepAliveTimer && clearInterval(this.keepAliveTimer)
      this.ws = new WebSocket(wsUrl)
      this.initEvent()
    } catch(e) {
      //
    }
  }

  reconnect() {
    showLogToServer('reconnect'+reconnectNum)
    if(reconnectNum >= maxReconnectNum) {
      clearInterval(reconnectTimer)
      return
    }
    reconnectNum++
    that.initWs()
  }
}
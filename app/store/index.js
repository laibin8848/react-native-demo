import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-community/async-storage'
 
export default class Store {


  static getInstance() {
    if(!this.instance) {
      this.instance = new Store()
      return this.instance
    } else {
      return this.instance
    }
  }

  saveSetting(data) {
    return this.storage.save(
      {
          key: 'appSetting',
          data: data,
          expires: null
      }
    )
  }

  loadSetting () {
    return this.storage.load({
      key: 'appSetting'
    })
  }

  saveRecords(data) {
    const day = new Date().getDate()
    return this.storage.save(
      {
          key: `notificationList${day}`,
          data: data,
          expires: 1000 * 3600 * 24
      }
    )
  }

  loadRecords() {
    const day = new Date().getDate()
    return this.storage.load({
      key: `notificationList${day}`
    })
  }
}
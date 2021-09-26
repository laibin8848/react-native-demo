import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-community/async-storage'
 
export default class Store {

  constructor() {
    this.storage = new Storage({
      // maximum capacity, default 1000
      size: 1000,
      // Use AsyncStorage for RN apps, or window.localStorage for web apps.
      // If storageBackend is not set, data will be lost after reload.
      storageBackend: AsyncStorage, // for web: window.localStorage
      // expire time, milliseconds
      defaultExpires: null,
      // cache data in the memory
      enableCache: true,
      // if data was not found in storage or expired data was found,
      // the corresponding sync method will be invoked returning
      // the latest data.
      sync: {
        // we'll talk about the details later.
      }
    })
  }

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
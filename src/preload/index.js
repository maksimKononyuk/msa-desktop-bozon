import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('subscribeForEntries', {
  subGetStorage: (callback) => {
    ipcRenderer.once('subGetStorage', callback)
  },
  getStorage: () => {
    ipcRenderer.send('getStorage')
  },
  setStorage: (data) => {
    ipcRenderer.send('setStorage', data)
  },
  deleteStorage: () => {
    ipcRenderer.send('deleteStorage')
  },
  setNotifications: () => {
    ipcRenderer.send('setNonifications') // отправка в main процесс события системного уведомления
  },
  openChildWindow: (url, isMessageFile) => {
    ipcRenderer.send('openChildWindow', url, isMessageFile)
  },
  setLanguageInMainProcess: (language) => {
    ipcRenderer.send('language', language)
  },
  quitApp: () => {
    ipcRenderer.send('quit')
  },
  openExternal: (url) => {
    ipcRenderer.send('openExternal', url)
  },
  closeApp: (callback) => {
    ipcRenderer.on('closeApp', callback)
  },
  closeListener: () => {
    ipcRenderer.send('closeListener')
  }
})

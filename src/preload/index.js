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
  openChildWindow: (url) => {
    ipcRenderer.send('openChildWindow', url)
  },
  setLanguageInMainProcess: (language) => {
    ipcRenderer.send('language', language)
  },
  quitApp: () => {
    ipcRenderer.send('quit')
  },
  openExternal: (url) => {
    ipcRenderer.send('openExternal', url)
  }
})

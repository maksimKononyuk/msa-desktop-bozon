import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('subscribeForEntries', {
  subGetSrtorage: (callback) => {
    ipcRenderer.once('subGetSrtorage', callback)
  },
  getStorage: () => {
    ipcRenderer.send('getStorage')
  },
  setStorage: (data) => {
    ipcRenderer.send('setStorage', data)
  },
  deleteStorage: () => {
    ipcRenderer.send('deleteStorage')
  }
})

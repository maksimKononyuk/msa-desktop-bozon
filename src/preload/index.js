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
  }
})

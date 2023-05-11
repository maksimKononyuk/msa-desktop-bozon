// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
import path from 'path'
import {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  dialog,
  shell
} from 'electron'
import Storage from './Storage'
import iconView from '../../resources/icon.png'

let win

let language = 'ru'

const createWindow = () => {
  // Create the browser window.
  win = new BrowserWindow({
    show: false,
    title: CONFIG.name,
    width: CONFIG.width,
    height: CONFIG.height,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      preload: path.join(app.getAppPath(), 'preload', 'index.js')
    },
    icon: path.join(__dirname, iconView),
    autoHideMenuBar: true
  })
  const storage = new Storage()

  // and load the index.html of the app.
  win.loadFile('renderer/index.html')

  process.env.NODE_ENV === 'development' &&
    win.webContents.openDevTools({ mode: 'detach' })

  win.on('closed', () => {
    win = null
  })

  win.once('ready-to-show', () => {
    win.show()
  })

  ipcMain.on('getStorage', () => {
    win.webContents.send('subGetStorage', storage.read('storageFile'))
  })

  ipcMain.on('setStorage', (event, data) => {
    storage.write('storageFile', data)
  })

  ipcMain.on('deleteStorage', (event, data) => {
    storage.deleteFile('storageFile')
  })

  ipcMain.on('language', (_, data) => {
    language = data
  })

  ipcMain.on('quit', () => app.quit())

  ipcMain.on('openExternal', (_, data) => shell.openExternal(data))

  const showNotification = () => {
    if (win.isMinimized()) {
      const notification = new Notification({
        subtitle: 'MSA',
        title: 'MSA',
        body: language === 'en' ? 'You have a new order' : 'У Вас новый заказ',
        icon: path.join(__dirname, iconView)
      })
      notification.show()
      notification.once('click', () => win.show())
    }
  }

  ipcMain.on('setNonifications', showNotification)
}

const createChild = (url) => {
  let childWin = new BrowserWindow({
    parent: win,
    modal: true,
    show: false,
    title: CONFIG.name,
    width: CONFIG.width,
    height: CONFIG.height,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      preload: path.join(app.getAppPath(), 'preload', 'index.js')
    },
    icon: path.join(__dirname, iconView),
    autoHideMenuBar: true
  })
  childWin.loadURL(url)
  if (url.includes('.html')) {
    childWin.webContents.insertCSS('body {overflow: hidden}')
  }
  childWin.once('ready-to-show', () => childWin.show())
  childWin.on('closed', () => (childWin = null))
}

ipcMain.on('openChildWindow', (event, url) => {
  createChild(url)
})

// This method will be called when Electron has finished

// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

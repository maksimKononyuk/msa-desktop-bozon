const path = require('path')
const { Application } = require('spectron')

const appPath = () => {
  switch (process.platform) {
    case 'darwin':
      return path.join(__dirname, '..', '.tmp', 'mac', 'MsaDesktop.app', 'Contents', 'MacOS', 'MsaDesktop')
    case 'linux':
      return path.join(__dirname, '..', '.tmp', 'linux', 'MsaDesktop')
    case 'win32':
      return path.join(__dirname, '..', '.tmp', 'win-unpacked', 'MsaDesktop.exe')
    default:
      throw Error(`Unsupported platform ${process.platform}`)
  }
}
global.app = new Application({ path: appPath() })

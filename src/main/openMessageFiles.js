import request from 'request'
import { createWriteStream, mkdirSync, existsSync } from 'fs'
import path from 'path'
import { app, shell } from 'electron'

const getFileNameFromYandexUrl = (url) => {
  const fileNameIndex = url.indexOf('&filename') + 1
  const subStr = url.slice(fileNameIndex)
  const fileName = subStr.slice(subStr.indexOf('=') + 1, subStr.indexOf('&'))
  return fileName.substr(fileName.lastIndexOf('.') + 1)
}

export const openMessageFiles = (url, childWin) => {
  const fileNemeExt = getFileNameFromYandexUrl(url)
  const req = request({ method: 'GET', uri: url })
  const fileDir = path.join(app.getPath('userData'), 'MessageFiles')
  if (!existsSync(fileDir)) {
    mkdirSync(fileDir)
  }
  const out = createWriteStream(path.join(fileDir, `temp-file.${fileNemeExt}`))
  req.pipe(out)
  req.once('end', () => {
    if (url.includes('pdf')) {
      childWin.loadFile(
        path.join(
          app.getPath('userData'),
          'MessageFiles',
          `temp-file.${fileNemeExt}`
        )
      )
      childWin.show()
      childWin.once('closed', () => (childWin = null))
    } else {
      shell.openExternal(
        path.join(
          app.getPath('userData'),
          'MessageFiles',
          `temp-file.${fileNemeExt}`
        )
      )
    }
  })
}

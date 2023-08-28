import request from 'request'
import {
  createWriteStream,
  mkdirSync,
  existsSync,
  readFileSync,
  writeFileSync,
  unlinkSync
} from 'fs'
import path from 'path'
import { app, shell } from 'electron'

const getFileNameFromYandexUrl = (url) => {
  const fileNameIndex = url.indexOf('&filename') + 1
  const subStr = url.slice(fileNameIndex)
  const fileName = subStr.slice(subStr.indexOf('=') + 1, subStr.indexOf('&'))
  return fileName.substr(fileName.lastIndexOf('.') + 1)
}

export const openMessageFiles = (url, childWin) => {
  console.log(url)
  const fileNemeExt = getFileNameFromYandexUrl(url)
  const req = request({ method: 'GET', uri: url })
  const fileDir = path.join(app.getPath('userData'), 'MessageFiles')
  if (!existsSync(fileDir)) {
    mkdirSync(fileDir)
  }
  const out = createWriteStream(path.join(fileDir, `temp.${fileNemeExt}`))
  req.pipe(out)
  req.once('end', () => {
    if (url.includes('.pdf')) {
      childWin.loadFile(
        path.join(
          app.getPath('userData'),
          'MessageFiles',
          `temp.${fileNemeExt}`
        )
      )
      childWin.show()
      childWin.once('closed', () => (childWin = null))
      return
    } else if (url.includes('.html')) {
      const str = readFileSync(
        path.join(
          app.getPath('userData'),
          'MessageFiles',
          `temp.${fileNemeExt}`
        )
      ).toString()
      const position = str.indexOf('for (var i in bomtable)')
      if (position >= 0) {
        const numberOfRows = 1
        const code = `bomtable && bomtable.length && (bomtable.length = ${numberOfRows})\n`
        const output = [str.slice(0, position), code, str.slice(position)].join(
          ''
        )
        writeFileSync(
          path.join(
            app.getPath('userData'),
            'MessageFiles',
            `temp.${fileNemeExt}`
          ),
          output
        )
      }
      childWin.loadFile(
        path.join(
          app.getPath('userData'),
          'MessageFiles',
          `temp.${fileNemeExt}`
        )
      )
      childWin.show()
      childWin.once('closed', () => {
        childWin = null
        unlinkSync(
          path.join(
            app.getPath('userData'),
            'MessageFiles',
            `temp.${fileNemeExt}`
          )
        )
      })
      return
    } else {
      shell.openExternal(
        path.join(
          app.getPath('userData'),
          'MessageFiles',
          `temp.${fileNemeExt}`
        )
      )
    }
  })
}

import { app } from 'electron'
import path from 'path'
import { mkdir, existsSync, readFileSync, writeFileSync, unlinkSync } from 'fs'

class Storage {
  constructor() {
    this.directory = path.join(app.getPath('userData'), 'FSStorage')
    if (!existsSync(this.directory)) {
      mkdir(this.directory, () => {})
    }
  }

  file(key) {
    const file = path.join(this.directory, `${key}.json`)
    if (!existsSync(file)) {
      writeFileSync(file, '')
    }
    return file
  }

  read(key) {
    return readFileSync(this.file(key), 'utf8')
  }

  write(key, data) {
    writeFileSync(this.file(key), JSON.stringify(data))
  }

  deliteFile(key) {
    unlinkSync(this.file(key))
  }
}

export default Storage

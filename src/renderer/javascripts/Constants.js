import axios from 'axios'

export const setAxiosSettings = () => {
  let url = localStorage.getItem('hosting')
  if (!url) url = 'https://demomsa.com/api/' // dev
  //const url = 'https://customer.demomsa.com/api' // prod

  axios.defaults.baseURL = url

  axios.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        if (localStorage.getItem('user')) {
          const token = JSON.parse(localStorage.getItem('user')).token

          if (token) {
            config.headers.Authorization = `Token ${token}`
          }
        }
      }

      return config
    },
    (error) => Promise.reject(error)
  )
}

export const storageClear = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('role')
}

export const getCouruselItems = (lang) => {
  switch (lang) {
    case 'en':
      return [
        { title: 'Order' },
        { title: 'Resources' },
        { title: 'Tech. maps' },
        { title: 'Reports' }
      ]
    case 'ru':
      return [
        { title: 'Заказ' },
        { title: 'Ресурсы' },
        { title: 'Тех. карты' },
        { title: 'Отчеты' }
      ]
    default:
      return [
        { title: 'Order' },
        { title: 'Resources' },
        { title: 'Tech. maps' },
        { title: 'Reports' }
      ]
  }
}

export const jsonTreeTheme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#FFFFFF',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#282A2D',
  base0C: '#a1efe4',
  base0D: '#009C6D',
  base0E: '#ae81ff',
  base0F: '#cc6633'
}

export const options = {
  container: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'Montserrat',
    fontSize: 46,
    color: '#fff'
  }
}

export const parseDate = (dateStr) => {
  const date = new Date(Date.parse(dateStr))
    .toLocaleString('ru', {
      timeZone: 'UTC'
    })
    .replace(',', '')
    .slice(0, -3)
  return date
}

export const localStorageClear = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('role')
}

export class SettingsComponentTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getLanguageLabel() {
    switch (this.lang) {
      case 'en':
        return 'Language'
      case 'ru':
        return 'Язык'
      default:
        return 'Language'
    }
  }
  getEnglishLabel() {
    switch (this.lang) {
      case 'en':
        return 'English'
      case 'ru':
        return 'Английский'
      default:
        return 'English'
    }
  }
  getRussianLabel() {
    switch (this.lang) {
      case 'en':
        return 'Russian'
      case 'ru':
        return 'Русский'
      default:
        return 'Russian'
    }
  }
  getHostingLabel() {
    switch (this.lang) {
      case 'en':
        return 'Hosting'
      case 'ru':
        return 'Хостинг'
      default:
        return 'Hosting'
    }
  }
  getSettingsLabel() {
    switch (this.lang) {
      case 'en':
        return 'Settings'
      case 'ru':
        return 'Настройки'
      default:
        return 'Settings'
    }
  }
}

export class CancelButtonTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getCancelLabel() {
    switch (this.lang) {
      case 'en':
        return 'Cancel'
      case 'ru':
        return 'Отмена'
      default:
        return 'Cancel'
    }
  }
}

export class UserMenuModalTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getNewOrderLabel() {
    switch (this.lang) {
      case 'en':
        return 'New order'
      case 'ru':
        return 'Новый заказ'
      default:
        return 'New order'
    }
  }
  getLogoutLabel() {
    switch (this.lang) {
      case 'en':
        return 'End shift'
      case 'ru':
        return 'Завершить смену'
      default:
        return 'End shift'
    }
  }
  getSettingsLabel() {
    switch (this.lang) {
      case 'en':
        return 'Settings'
      case 'ru':
        return 'Настройки'
      default:
        return 'Settings'
    }
  }
  getFileSystemLabel() {
    switch (this.lang) {
      case 'en':
        return 'File system'
      case 'ru':
        return 'Файловая система'
      default:
        return 'File system'
    }
  }
  getExitLabel() {
    switch (this.lang) {
      case 'en':
        return 'Exit'
      case 'ru':
        return 'Выйти'
      default:
        return 'Exit'
    }
  }
  getVersionLabel() {
    switch (this.lang) {
      case 'en':
        return 'Version'
      case 'ru':
        return 'Версия'
      default:
        return 'Version'
    }
  }
  getRightsLabel() {
    switch (this.lang) {
      case 'en':
        return '© 2023 All rights reserved.'
      case 'ru':
        return '© 2023 Все права защищены.'
      default:
        return '© 2023 All rights reserved.'
    }
  }
  getDigitalPlatformLabel() {
    switch (this.lang) {
      case 'en':
        return 'Digital platform MSA.'
      case 'ru':
        return 'Цифровая платформа MSA.'
      default:
        return 'Digital platform MSA.'
    }
  }
}

export class ActiveOrderTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getInfoLable() {
    switch (this.lang) {
      case 'en':
        return 'Complete order information will appear after clicking "START"'
      case 'ru':
        return 'Полная информация о заказе появится после нажатия на кнопку "НАЧАТЬ"'
      default:
        return 'Complete order information will appear after clicking "START"'
    }
  }
  getPrintLabel() {
    switch (this.lang) {
      case 'en':
        return 'Print'
      case 'ru':
        return 'Печать'
      default:
        return 'Print'
    }
  }
}
export class OperationContainerTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getTitleLabel() {
    switch (this.lang) {
      case 'en':
        return 'Operation'
      case 'ru':
        return 'Операция'
      default:
        return 'Operation'
    }
  }
}

export class TimerTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getTitleLable() {
    switch (this.lang) {
      case 'en':
        return 'Work time on the order'
      case 'ru':
        return 'Время работы над заказом'
      default:
        return 'Work time on the order'
    }
  }
}

export class StartFinishButtonTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getStartLable() {
    switch (this.lang) {
      case 'en':
        return 'START'
      case 'ru':
        return 'НАЧАТЬ'
      default:
        return 'START'
    }
  }
  getFinishLable() {
    switch (this.lang) {
      case 'en':
        return 'FINISH'
      case 'ru':
        return 'ЗАВЕРШИТЬ'
      default:
        return 'FINISH'
    }
  }
  getStartAlert() {
    switch (this.lang) {
      case 'en':
        return 'Choose equipment!'
      case 'ru':
        return 'Выберите оборудование!'
      default:
        return 'Choose equipment!'
    }
  }
}
export class OrdersTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getTitleLable() {
    switch (this.lang) {
      case 'en':
        return 'Searching for available orders'
      case 'ru':
        return 'Поиск доступных заказов'
      default:
        return 'Searching for available orders'
    }
  }
}

export class CompleteWorkShiftTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getInfoLable() {
    switch (this.lang) {
      case 'en':
        return 'Do you really want to complete your work shift?'
      case 'ru':
        return 'Вы действительно хотите завершить свою рабочую смену?'
      default:
        return 'Do you really want to complete your work shift?'
    }
  }
  getYesLable() {
    switch (this.lang) {
      case 'en':
        return 'Yes'
      case 'ru':
        return 'Да'
      default:
        return 'Yes'
    }
  }
  getNoLable() {
    switch (this.lang) {
      case 'en':
        return 'No'
      case 'ru':
        return 'Нет'
      default:
        return 'No'
    }
  }
}

export class OperationResultTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getTitleLable() {
    switch (this.lang) {
      case 'en':
        return 'Operation result'
      case 'ru':
        return 'Результат операции'
      default:
        return 'Operation result'
    }
  }
}
export class EquipmentTranslale {
  constructor(lang) {
    this.lang = lang
  }
  getTitleLabel() {
    switch (this.lang) {
      case 'en':
        return 'Choose equipment'
      case 'ru':
        return 'Выберите оборудование'
      default:
        return 'Choose equipment'
    }
  }
}

export class MessagesTranslale {
  constructor(lang) {
    this.lang = lang
  }
  getInfoLabel() {
    switch (this.lang) {
      case 'en':
        return 'You have not messages'
      case 'ru':
        return 'У вас нет сообщений'
      default:
        return 'You have not messages'
    }
  }
  getNewMessageLabel() {
    switch (this.lang) {
      case 'en':
        return 'New message'
      case 'ru':
        return 'Новое сообщение'
      default:
        return 'New message'
    }
  }
}
export class MainTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getFinishOrderAlert() {
    switch (this.lang) {
      case 'en':
        return 'Your operation has been completed!'
      case 'ru':
        return 'Ваша операция завершена!'
      default:
        return 'Your operation has been completed!'
    }
  }
}
export class AuthTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getSignInLabel() {
    switch (this.lang) {
      case 'en':
        return 'Sign in'
      case 'ru':
        return 'Вход'
      default:
        return 'Sign in'
    }
  }
  getLoginLabel() {
    switch (this.lang) {
      case 'en':
        return 'Login'
      case 'ru':
        return 'Логин'
      default:
        return 'Login'
    }
  }
  getPasswordLabel() {
    switch (this.lang) {
      case 'en':
        return 'Password'
      case 'ru':
        return 'Пароль'
      default:
        return 'Password'
    }
  }
  getIncorrectLoginLabel() {
    switch (this.lang) {
      case 'en':
        return 'The login or password is incorrect.'
      case 'ru':
        return 'Неверный логин или пароль.'
      default:
        return 'The login or password is incorrect.'
    }
  }
  getContactAdminLabel() {
    switch (this.lang) {
      case 'en':
        return 'Please try again or contact your administrator.'
      case 'ru':
        return 'Пожалуйста, попробуйте еще раз или обратитесь к своему администратору.'
      default:
        return 'Please try again or contact your administrator.'
    }
  }
}

export class RightBlockTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getPreviousOperationLabel() {
    switch (this.lang) {
      case 'en':
        return 'Previous operation'
      case 'ru':
        return 'Предыдущая операция'
      default:
        return 'Previous operation'
    }
  }
  getResultOfPreviousOperationLabel() {
    switch (this.lang) {
      case 'en':
        return 'Result of Previous operation'
      case 'ru':
        return 'Результат предыдущей операции'
      default:
        return 'Result of Previous operation'
    }
  }
  getNoPreviousOperationLabel() {
    switch (this.lang) {
      case 'en':
        return 'No previous operation'
      case 'ru':
        return 'Нет предыдущей операции'
      default:
        return 'No previous operation'
    }
  }
}
export class MaterialsTranslate {
  constructor(lang) {
    this.lang = lang
  }
  getTitleLabel() {
    switch (this.lang) {
      case 'en':
        return 'Materials, semi-finished products, finished products'
      case 'ru':
        return 'Материалы, полуфабрикаты, готовая продукция'
      default:
        return 'Materials, semi-finished products, finished products'
    }
  }
}

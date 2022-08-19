import axios from 'axios'

export const setAxiosSettings = () => {
  const url = 'https://demomsa.com/api/' // dev
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

export const carouselItems = [
  { title: 'Messages' },
  { title: 'Order' },
  { title: 'Tech. maps' }
]

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

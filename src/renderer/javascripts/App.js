import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Auth from './pages/Auth'
import Main from './pages/Main'

import { Provider } from 'react-redux'
import store from './redux/store'
import { setAxiosSettings } from './Constants'
import '../stylesheets/fonts.css'

setAxiosSettings()

export default function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/main' element={<Main />} />
      </Routes>
    </Provider>
  )
}

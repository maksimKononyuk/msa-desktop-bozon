import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native-web'
import axios from 'axios'

import styles from '../styles/Styles'
import { useDispatch, useSelector } from 'react-redux'
import {
  setLogin,
  setPassword,
  setAppIsReady,
  setShowError
} from '../redux/actionCreators'
import authLogo from '../assets/images/auth.png'
import passwordIcon from '../assets/icons/passwordVisible.png'

function Auth() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const login = useSelector((state) => state.auth.login)
  const password = useSelector((state) => state.auth.password)
  const appIsReady = useSelector((state) => state.auth.appIsReady)
  const showError = useSelector((state) => state.auth.showError)

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const passwordTextInput = useRef()

  useEffect(() => {
    async function prepare() {
      try {
        localStorage.clear()
      } catch (e) {
        console.log(e)
      } finally {
        dispatch(setAppIsReady(true))
      }
    }

    prepare()
  }, [])

  if (!appIsReady) {
    return null
  }

  const tryAuth = async () => {
    await axios
      .post('users/login', { user: { name: login, password } })
      .then(async (res) => {
        localStorage.setItem('role', res.data.role)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        const userData = await axios.get(`worker_name/${res.data.user.u_id}`)
        axios
          .put('worker_in', { _id: res.data.user.u_id, at_work: true })
          .then(() => {
            dispatch(setLogin(''))
            dispatch(setPassword(''))
            navigate('/main', {
              state: { userName: userData.data[0].name }
            })
          })
      })
      .catch((err) => {
        console.warn(err)
        dispatch(setShowError(true))
      })
  }

  const textInputFocus = (event) => {
    event.currentTarget.style.outline = 'none'
  }

  return (
    <View style={styles.container}>
      <View style={styles.authContainer}>
        <Image style={{ width: '100%', height: 130 }} source={authLogo} />
        <TextInput
          placeholder='Login'
          placeholderTextColor={'grey'}
          value={login}
          onChangeText={(text) => dispatch(setLogin(text))}
          style={styles.authInput}
          autoFocus={true}
          returnKeyType={'next'}
          onSubmitEditing={() => passwordTextInput.current.focus()}
          blurOnSubmit={false}
          onFocus={textInputFocus}
        />
        <View style={{ width: '100%', marginTop: 50 }}>
          <TextInput
            placeholder='Password'
            placeholderTextColor={'grey'}
            value={password}
            onChangeText={(text) => dispatch(setPassword(text))}
            style={[styles.authInput, { marginTop: 0 }]}
            secureTextEntry={!isPasswordVisible}
            ref={passwordTextInput}
            onFocus={textInputFocus}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              position: 'absolute',
              width: 43,
              height: 43,
              right: 0
            }}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Image
              style={{ width: '100%', height: '100%' }}
              source={passwordIcon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => tryAuth()}
          style={styles.authButton}
        >
          <Text style={styles.authText}>Sign in</Text>
        </TouchableOpacity>
      </View>

      {showError && (
        <View
          style={styles.authError}
          // onAnimationEnd={() =>
          //   setTimeout(() => dispatch(setShowError(false)), 3000)
          // }
        >
          <Text style={{ fontSize: 18, fontFamily: 'Roboto', color: '#fff' }}>
            The login or password is incorrect.
          </Text>
          <Text
            style={{ fontSize: 14, fontFamily: 'Roboto', color: '#FFB5B5' }}
          >
            Please try again or contact your administrator.
          </Text>
        </View>
      )}
    </View>
  )
}

export default Auth

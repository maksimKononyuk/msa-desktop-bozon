import React, { useEffect, useRef, useState } from 'react'
import { View, TouchableOpacity, TextInput, Image } from 'react-native-web'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import {
  setErrorMessage,
  setIsErrorComponentVisible
} from '../../redux/actionCreators'
import sendButton from '../../assets/images/send.png'
import styles from './styles'

const NewMessagesItem = ({ orderId, userId }) => {
  const dispatch = useDispatch()
  const [newMessage, setNewMessage] = useState('')

  const buttonHandler = (message) => {
    if (message) {
      axios
        .post('order_worker_new_message', {
          _id: orderId,
          u_id: userId,
          message
        })
        .then(() => setNewMessage(''))
        .catch((err) => {
          console.log('Network error when sending a message ' + err)
          dispatch(setErrorMessage('when sending a message ' + err))
          dispatch(setIsErrorComponentVisible(true))
        })
    }
  }
  const input = useRef()

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        buttonHandler(input.current.value)
      }
    }
    input.current.addEventListener('keydown', keyDownHandler)
    return () => {
      input.current.removeEventListener('keydown', keyDownHandler)
    }
  }, [])

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='New message'
        value={newMessage}
        onChangeText={(text) => setNewMessage(text)}
        ref={input}
      />
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.sendButton}
        onPress={() => buttonHandler(newMessage)} // отправка сообщения только если тело сообщения не пустое
      >
        <Image source={sendButton} style={styles.sendButtonImage} />
      </TouchableOpacity>
    </View>
  )
}

export default NewMessagesItem

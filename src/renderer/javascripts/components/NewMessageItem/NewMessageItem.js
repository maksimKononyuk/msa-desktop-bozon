import React, { useEffect, useRef, useState, useMemo } from 'react'
import { View, TouchableOpacity, TextInput, Image } from 'react-native-web'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {
  setErrorMessage,
  setIsErrorComponentVisible
} from '../../redux/actionCreators'
import sendButton from '../../assets/images/send.png'
import styles from './styles'
import { MessagesTranslale } from '../../Constants'

const NewMessagesItem = ({ orderId, userId }) => {
  const dispatch = useDispatch()
  const [newMessage, setNewMessage] = useState('')

  const language = useSelector((state) => state.main.language)
  const translate = useMemo(() => new MessagesTranslale(language))

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
    const ref = input.current
    const keyDownHandler = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        buttonHandler(input.current.value)
      }
    }
    ref.addEventListener('keydown', keyDownHandler)
    return () => {
      ref.removeEventListener('keydown', keyDownHandler)
    }
  }, [])

  return (
    <View style={styles.container}>
      <TextInput
        ref={input}
        style={styles.input}
        placeholder={translate.getNewMessageLabel()}
        value={newMessage}
        onChangeText={(text) => setNewMessage(text)}
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

import React, { useEffect, useRef, useState, useMemo } from 'react'
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Text
} from 'react-native-web'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setNewMessage } from '../../redux/actionCreators'
import sendButton from '../../assets/images/send.png'
import styles from './styles'
import { MessagesTranslale } from '../../Constants'

const NewMessagesItem = ({
  isInSendDocumentModal,
  chooseDocumentInDevice,
  messageButtonHandler,
  sendHandler
}) => {
  const dispatch = useDispatch()
  const newMessage = useSelector((state) => state.newMessageItem.newMessage)

  const language = useSelector((state) => state.main.language)
  const translate = useMemo(() => new MessagesTranslale(language))

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

  const buttonHandler = () => {
    if (isInSendDocumentModal) sendHandler()
    else newMessage && messageButtonHandler() // отправка сообщения только если тело сообщения не пустое
  }

  return (
    <View style={styles.container}>
      <View style={styles.filePickerAndInputContainer}>
        {!isInSendDocumentModal && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={chooseDocumentInDevice}
          >
            <Text style={{ fontSize: 35 }}>
              {String.fromCodePoint(0x1f4ce)}
            </Text>
          </TouchableOpacity>
        )}
        <TextInput
          ref={input}
          style={styles.input}
          placeholder={translate.getNewMessageLabel()}
          value={newMessage}
          onChangeText={(text) => dispatch(setNewMessage(text))}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.sendButton}
        onPress={buttonHandler}
      >
        <Image source={sendButton} style={styles.sendButtonImage} />
      </TouchableOpacity>
    </View>
  )
}

export default NewMessagesItem

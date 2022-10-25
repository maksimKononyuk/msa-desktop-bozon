import axios from 'axios'
import React, { useEffect, useMemo } from 'react'
import { View, Text } from 'react-native-web'
import { useSelector, useDispatch } from 'react-redux'
import { MessagesTranslale } from '../../Constants'
import {
  setMessages,
  setErrorMessage,
  setIsErrorComponentVisible
} from '../../redux/actionCreators'
import MessageItem from '../MessageItem/MessageItem'
import NewMessagesItem from '../NewMessageItem/NewMessageItem'
import styles from './styles'

const Messages = ({ userName }) => {
  const dispatch = useDispatch()
  const orderId = useSelector((state) => state.main.activeOrder?._id)
  const userId = useSelector((state) => state.main.user.u_id)
  const messages = useSelector((state) => state.messages.messages)
  const operation = useSelector(
    (state) => state.main.activeOrder.description.name
  )

  const language = useSelector((state) => state.main.language)
  const translate = useMemo(() => new MessagesTranslale(language), [language])

  useEffect(() => {
    const getMessage = setInterval(() => {
      axios
        .get(`order_worker_message/${orderId}`)
        .then((res) => {
          dispatch(setMessages(res.data))
        })
        .catch((err) => {
          console.log('Network error when receiving messages ' + err)
          dispatch(setErrorMessage('when receiving messages ' + err))
          dispatch(setIsErrorComponentVisible(true))
        })
    }, 1000)
    return () => {
      clearInterval(getMessage)
    }
  }, [])

  return (
    <View style={styles.container}>
      {messages.length === 0 ? (
        <Text style={styles.notMessageText}>{translate.getInfoLabel()}</Text>
      ) : (
        <View style={styles.messagesBlock}>
          {messages.map((item, index) => {
            return (
              <MessageItem
                key={index}
                isYourMessage={userId === item.w_id}
                userName={userId === item.w_id ? userName : item.worker}
                operation={operation}
                date={item.m_data}
                message={item.message}
              />
            )
          })}
        </View>
      )}
      <NewMessagesItem orderId={orderId} userId={userId} />
    </View>
  )
}

export default Messages

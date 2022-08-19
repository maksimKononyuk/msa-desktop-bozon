import React, { useRef, useEffect } from 'react'
import { View, Text, Image } from 'react-native-web'
import avatar from '../../assets/images/avatar_local.png'
import styles from './styles'

const MessageItem = ({ isYourMessage, userName, operation, data, message }) => {
  const scrollRef = useRef()

  useEffect(() => {
    scrollRef.current?.scrollIntoView(false)
  }, [])

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isYourMessage ? '#0080FF' : '#F5F5F5',
          borderTopLeftRadius: isYourMessage ? 14 : 0,
          borderTopRightRadius: isYourMessage ? 0 : 14,
          alignSelf: isYourMessage ? 'flex-end' : 'flex-start'
        }
      ]}
      ref={scrollRef}
    >
      <View style={styles.infoBlock}>
        <View style={styles.leftPart}>
          <Image source={avatar} style={styles.avatar} />
          <Text style={[styles.text, isYourMessage && { color: '#ffffff' }]}>
            {userName}
          </Text>
          <Text
            style={[
              styles.text,
              styles.operationText,
              isYourMessage && { color: '#ffffff' }
            ]}
          >
            Operation: {operation}
          </Text>
        </View>
        <Text
          style={[
            styles.text,
            { fontSize: 12 },
            isYourMessage && { color: '#ffffff' }
          ]}
        >
          {new Date(data).toLocaleString().split(',').join('')}
        </Text>
      </View>
      <Text style={[styles.message, isYourMessage && { color: '#ffffff' }]}>
        {message}
      </Text>
    </View>
  )
}

export default MessageItem

import React, { useRef, useEffect, useMemo } from 'react'
import { View, Text, Image } from 'react-native-web'
import avatar from '../../assets/images/avatar_local.png'
import styles from './styles'
import { parseDate } from '../../Constants'

const MessageItem = ({ isYourMessage, userName, operation, date, message }) => {
  const scrollRef = useRef()
  const dateStr = useMemo(() => parseDate(date), [])

  useEffect(() => {
    scrollRef.current?.scrollIntoView(false)
  }, [])

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isYourMessage ? '#0080FF' : '#DCDCDC',
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
            { fontSize: 12, width: '20%' },
            isYourMessage && { color: '#ffffff' }
          ]}
        >
          {dateStr}
        </Text>
      </View>
      <Text style={[styles.message, isYourMessage && { color: '#ffffff' }]}>
        {message}
      </Text>
    </View>
  )
}

export default MessageItem

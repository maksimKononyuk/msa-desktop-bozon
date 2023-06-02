import React, { useRef, useEffect, useMemo, useState } from 'react'
import { View, Text, Image, ActivityIndicator } from 'react-native-web'
import avatar from '../../assets/images/avatar_local.png'
import styles from './styles'
import { yandexDiskHeaders } from '../../Constants'
import { useSelector } from 'react-redux'
import { OperationContainerTranslate } from '../../Constants'
import MessageFile from '../MessageFile/MessageFile'

const MessageItem = ({ isYourMessage, userName, operation, date, message }) => {
  const scrollRef = useRef()

  const language = useSelector((state) => state.main.language)
  const translate = useMemo(
    () => new OperationContainerTranslate(language),
    [language]
  )

  useEffect(() => {
    scrollRef.current?.scrollIntoView(false)
  }, [])

  const [isLoadingLinks, setIsLoadingLinks] = useState(true)
  const [textMessage, setTextMessage] = useState('')
  const [linksArr, setLinksArr] = useState([])

  const getLinkForFileFromYaDisk = async (url) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: yandexDiskHeaders
    })
    const data = await response.json()
    return data.href
  }

  useEffect(() => {
    if (message.includes('%iconLink%')) {
      const messageDataArr = message.split('%iconLink%')
      setTextMessage(messageDataArr[0])
      messageDataArr[1].split(',').forEach(async (link) => {
        const href = await getLinkForFileFromYaDisk(link)
        setLinksArr((prev) => {
          const newArr = [...prev]
          newArr.push(href)
          return newArr
        })
      })
      setIsLoadingLinks(false)
    } else {
      setIsLoadingLinks(false)
      setTextMessage(message)
    }
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
        <View style={styles.upPart}>
          <View style={styles.logoAndUserName}>
            <Image source={avatar} style={styles.avatar} />
            <Text style={[styles.text, isYourMessage && { color: '#ffffff' }]}>
              {userName}
            </Text>
          </View>
          <View>
            <Text style={[styles.text, isYourMessage && { color: '#ffffff' }]}>
              {new Date(
                new Date(date).setUTCHours(new Date(date).getUTCHours() - 2)
              ).toLocaleString()}
            </Text>
          </View>
        </View>
        <View style={styles.operationBlock}>
          <Text
            style={[
              styles.text,
              styles.operationText,
              isYourMessage && { color: '#ffffff' }
            ]}
          >
            {translate.getTitleLabel()}: {operation}
          </Text>
        </View>
      </View>
      {isLoadingLinks ? (
        <ActivityIndicator size='large' color='#000088' />
      ) : linksArr.length > 0 ? (
        <View style={{ alignItems: 'center' }}>
          <Text
            style={[
              styles.message,
              { marginLeft: 0, width: '90%' },
              isYourMessage && { color: '#ffffff' }
            ]}
          >
            {textMessage}
          </Text>
          <View style={styles.fileIconsContainer}>
            {linksArr.map((item, index) => (
              <MessageFile uri={item} key={index} />
            ))}
          </View>
        </View>
      ) : (
        <Text style={[styles.message, isYourMessage && { color: '#ffffff' }]}>
          {textMessage}
        </Text>
      )}
    </View>
  )
}

export default MessageItem

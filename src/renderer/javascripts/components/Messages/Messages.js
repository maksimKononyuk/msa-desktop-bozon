import axios from 'axios'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native-web'
import { useSelector, useDispatch } from 'react-redux'
import { MessagesTranslale, yandexDiskHeaders } from '../../Constants'
import {
  setMessages,
  setErrorMessage,
  setIsErrorComponentVisible,
  setNewMessage
} from '../../redux/actionCreators'
import MessageItem from '../MessageItem/MessageItem'
import NewMessagesItem from '../NewMessageItem/NewMessageItem'
import SendDocumentModal from '../SendDocumentModal/SendDocumentModal'
import styles from './styles'

let massageInSendDocumentModal = ''

const Messages = ({ userName }) => {
  const dispatch = useDispatch()
  const orderId = useSelector((state) => state.main.activeOrder?._id)
  const userId = useSelector((state) => state.main.user.u_id)
  const messages = useSelector((state) => state.messages.messages)
  const operation = useSelector(
    (state) => state.main.activeOrder.description.name
  )
  const newMessage = useSelector((state) => state.newMessageItem.newMessage)

  const language = useSelector((state) => state.main.language)
  const translate = useMemo(() => new MessagesTranslale(language), [language])

  const inputFile = useRef(null)
  const [filesForSend, setFilesForSend] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [uries, setUries] = useState([])
  const [isFileLoader, setIsFileLoader] = useState(false)
  const [loadPersent, setLoadPersent] = useState(0)
  const [isLoadMessages, setIsLoadMessages] = useState(true)

  useEffect(() => {
    const getMessage = setInterval(() => {
      axios
        .get(`order_worker_message/${orderId}`)
        .then((res) => {
          dispatch(setMessages(res.data))
          setIsLoadMessages(false)
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

  // Отправка сообщиния и ссылок на выбранные файлы на сервер MSA после получения этих ссылок
  useEffect(() => {
    if (uries.length === filesForSend.length && uries.length !== 0) {
      axios
        .post('order_worker_new_message', {
          _id: orderId,
          u_id: userId,
          message: massageInSendDocumentModal + '%iconLink%' + uries.join(',')
        })
        .then(() => (massageInSendDocumentModal = ''))
        .catch((err) => console.log(err))
      setFilesForSend([])
      setUries([])
      setIsFileLoader(false)
    }
  }, [uries.length])

  // создание нужной директории на яндекс диске (одним PUT-запросом создается только одна папка)
  const mkDir = async () => {
    await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources?path=/${userId}/`,
      {
        method: 'PUT',
        headers: yandexDiskHeaders
      }
    )
    await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources?path=/${userId}/emploees/`,
      {
        method: 'PUT',
        headers: yandexDiskHeaders
      }
    )
    return `${userId}/emploees`
  }

  // Отправка одного файла и получение ссылки на файл
  const sendHandlerOneFile = async (dir, file) => {
    setIsFileLoader(true)
    // Указание ссылки в яндекс диске с именем файла, куда будет загружен файл
    const urlDisk = `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${dir}/${file.name}&overwrite=true`
    const urlForUploadRes = await fetch(urlDisk, {
      method: 'GET',
      headers: yandexDiskHeaders
    })
    const urlForUpload = await urlForUploadRes.json()

    // Загрузка самого файла по полученной ссылке для загрузки (При загрузке файла токен не требуется)
    // await fetch(urlForUpload.href, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: file
    // })

    const xhr = new XMLHttpRequest()
    xhr.open('PUT', urlForUpload.href)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.upload.onprogress = (e) => {
      setLoadPersent(Math.round((e.loaded / e.total) * 100))
    }
    xhr.onreadystatechange = async function (e) {
      if (e.target.readyState == 4) {
        if (e.target.status == 201) {
          // успешно отправили файл
          // Получение ссылки на загруженный файл
          // const hrefRes = await fetch(
          //   `https://cloud-api.yandex.net/v1/disk/resources/download?path=${dir}/${file.name}`,
          //   {
          //     method: 'GET',
          //     headers: yandexDiskHeaders
          //   }
          // )
          // ссылка на загруженный файл в яндекс диск; передается в сообщении вместе с текстом сообщения для дальнейшего отображения картинки в блоке сообщения
          // const href = await hrefRes.json()
          const fetchUrlForFileFromYaDisk = `https://cloud-api.yandex.net/v1/disk/resources/download?path=${dir}/${file.name}`

          setUries((prev) => {
            const newArr = [...prev]
            // newArr.push(href.href)
            newArr.push(fetchUrlForFileFromYaDisk)
            return newArr
          })
        } else {
          // произошла ошибка
          console.log('Error!')
        }
      }
    }
    xhr.send(file)
  }

  // Обработчик кнопки "Отправить сообщение и файлы"
  const sendHandler = async () => {
    massageInSendDocumentModal = newMessage
    dispatch(setNewMessage(''))
    setIsModalVisible(false)
    const dir = await mkDir()
    for (let i = 0; i < filesForSend.length; i++) {
      sendHandlerOneFile(dir, filesForSend[i])
    }
  }

  // Обработчие кнопки "Отмена" окна выбора файлов
  const canselModalHandler = () => {
    setIsModalVisible(false)
    setFilesForSend([])
  }

  // Отправка сообщения без выбора файлов
  const messageButtonHandler = () => {
    axios
      .post('order_worker_new_message', {
        _id: orderId,
        u_id: userId,
        message: newMessage
      })
      .then(() => dispatch(setNewMessage('')))
      .catch((err) => {
        console.log('Network error when sending a message ' + err)
        dispatch(setErrorMessage('when sending a message ' + err))
        // dispatch(setIsErrorComponentVisible(true))
      })
  }

  const fileListToArray = (fileList) => {
    return Array.from(fileList)
  }

  const chooseDocumentInDevice = () => {
    inputFile.current.click()
  }

  const selectedFiles = (event) => {
    const { files } = event.target
    const filesArray = fileListToArray(files)
    setFilesForSend((prev) => {
      const newArr = [...prev]
      newArr.push.apply(newArr, filesArray)
      return newArr
    })
    setIsModalVisible(true)
  }

  return (
    <View style={styles.container}>
      {isFileLoader && (
        <View style={styles.loader}>
          <Text style={styles.loaderText}>{loadPersent} %</Text>
        </View>
      )}
      {isLoadMessages ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size='large' color='#000088' />
        </View>
      ) : messages.length === 0 ? (
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
      <NewMessagesItem
        orderId={orderId}
        userId={userId}
        chooseDocumentInDevice={chooseDocumentInDevice}
        messageButtonHandler={messageButtonHandler}
      />
      <input
        type='file'
        multiple={true}
        ref={inputFile}
        onChange={selectedFiles}
        style={{ display: 'none' }}
      />
      {isModalVisible && (
        <SendDocumentModal
          chooseDocumentInDevice={chooseDocumentInDevice}
          filesForSend={filesForSend}
          sendHandler={sendHandler}
          canselModalHandler={canselModalHandler}
          messageButtonHandler={messageButtonHandler}
        />
      )}
    </View>
  )
}

export default Messages

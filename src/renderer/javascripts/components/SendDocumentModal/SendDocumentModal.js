import React from 'react'
import { Modal, View, TouchableOpacity, Image } from 'react-native-web'
import SendDocumentImageItem from '../SendDocumentImageItem/SendDocumentImageItem'
import NewMessagesItem from '../NewMessageItem/NewMessageItem'
import CancelButton from '../CancelButton/CancelButton'
import plusSign from '../../assets/icons/plusSign.svg'
import styles from './styles'

const SendDocumentModal = ({
  chooseDocumentInDevice,
  filesForSend,
  sendHandler,
  canselModalHandler
}) => {
  return (
    <Modal visible={true} animationType='slide' transparent={true}>
      <View style={styles.container}>
        <View style={styles.visibleContainer}>
          <View style={styles.imageBlock}>
            {filesForSend.length > 1 ? (
              filesForSend.map((item, index) => (
                <SendDocumentImageItem file={item} key={index} />
              ))
            ) : (
              <SendDocumentImageItem file={filesForSend[0]} isOneItem={true} />
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.addButton}
            onPress={chooseDocumentInDevice}
          >
            <Image
              source={plusSign}
              style={{ width: '100%', height: '100%' }}
            />
          </TouchableOpacity>
          <NewMessagesItem
            isInSendDocumentModal={true}
            sendHandler={sendHandler}
          />
          <View style={styles.canselContainer}>
            <CancelButton handler={canselModalHandler} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default SendDocumentModal

import React, { useState, useMemo } from 'react'
import {
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Modal
} from 'react-native-web'
import iconFile from '../../assets/icons/file.png'
import styles from './styles'

const MessageFile = ({ uri }) => {
  const [isIconLoading, setIsIconLoading] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const isImage = useMemo(() => {
    if (
      uri.toLowerCase().includes('jpg') ||
      uri.toLowerCase().includes('jpeg') ||
      uri.toLowerCase().includes('png') ||
      uri.toLowerCase().includes('gif')
    )
      return true
    else return false
  }, [uri])

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.pickerBlock}
        onPress={() => {
          console.log(uri)
          if (
            uri.toLowerCase().includes('pdf') ||
            uri.toLowerCase().includes('docx')
          ) {
            subscribeForEntries.openChildWindow(uri)
            return
          }
          setIsModalVisible(true)
        }}
      >
        <Image
          onLoadEnd={() => setIsIconLoading(false)}
          source={
            isImage
              ? {
                  uri: uri
                }
              : iconFile
          }
          style={styles.pickerContainer}
          resizeMode='cover'
        />
        {isIconLoading && (
          <View style={styles.activityIndicator}>
            <ActivityIndicator size='large' color='#000088' />
          </View>
        )}
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType='slide' transparent={false}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setIsModalVisible(false)}
          style={styles.modalCancelBlock}
        >
          <View
            style={[
              styles.closeModalButtonLeftLine,
              styles.closeModalButtonLine
            ]}
          />
          <View
            style={[
              styles.closeModalButtonRightLine,
              styles.closeModalButtonLine
            ]}
          />
        </TouchableOpacity>
        <Image
          source={{ uri }}
          style={{ width: '95%', height: '95%' }}
          resizeMode='contain'
        />
      </Modal>
    </>
  )
}

export default MessageFile

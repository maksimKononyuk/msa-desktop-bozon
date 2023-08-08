import React, { useEffect, useState } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native-web'
import fileIcon from '../../assets/icons/file.png'
import styles from './styles'

const SendDocumentImageItem = ({ file, isOneItem, index, setFilesForSend }) => {
  const [src, setSrc] = useState('')
  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const src = event.target.result
        setSrc(src)
      }
      reader.readAsDataURL(file)
    }
  }, [])
  return (
    <View
      style={[
        styles.container,
        {
          width: isOneItem ? '95%' : '20%',
          maxWidth: isOneItem ? '95%' : '20%',
          height: isOneItem ? '95%' : '35%',
          marginRight: 10
        }
      ]}
    >
      {index !== undefined && (
        <View
          style={{ position: 'absolute', right: 0, top: -10, zIndex: 5000 }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              setFilesForSend((prev) => {
                const newArr = prev.filter((_, i) => i !== index)
                return newArr
              })
            }}
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
        </View>
      )}
      {/* {file?.type.match('image') ? (
        <Image style={styles.image} resizeMode='contain' source={src} />
      ) : ( */}
      <View style={{ alignItems: 'center', height: '100%' }}>
        <Image
          style={{ ...styles.image, height: '90%' }}
          resizeMode='contain'
          source={fileIcon}
        />
        <Text style={{ textAlign: 'center', width: '100%' }}>{file?.name}</Text>
      </View>
      {/* )} */}
    </View>
  )
}

export default SendDocumentImageItem

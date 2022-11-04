import React, { useEffect, useState } from 'react'
import { View, Image, Text } from 'react-native-web'
import fileIcon from '../../assets/icons/file.png'
import styles from './styles'

const SendDocumentImageItem = ({ file, isOneItem }) => {
  const [src, setSrc] = useState('')
  useEffect(() => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const src = event.target.result
      setSrc(src)
    }
    reader.readAsDataURL(file)
  }, [])
  return (
    <View
      style={[
        styles.container,
        {
          width: isOneItem ? '95%' : '33.33%',
          height: isOneItem ? '95%' : '33.33%'
        }
      ]}
    >
      {file.type.match('image') ? (
        <Image style={styles.image} resizeMode='contain' source={src} />
      ) : (
        <View style={{ alignItems: 'center', height: '100%' }}>
          <Image
            style={{ ...styles.image, height: '90%' }}
            resizeMode='contain'
            source={fileIcon}
          />
          <Text>{file.name}</Text>
        </View>
      )}
    </View>
  )
}

export default SendDocumentImageItem

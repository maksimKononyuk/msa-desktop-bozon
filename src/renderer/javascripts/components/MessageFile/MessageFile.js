import React, { useState } from 'react'
import { View, Image, ActivityIndicator } from 'react-native-web'
import iconFile from '../../assets/icons/file.png'
import styles from './styles'

const MessageFile = ({ uri }) => {
  const [isIconLoading, setIsIconLoading] = useState(true)

  return (
    <View style={styles.pickerBlock}>
      <Image
        onLoadEnd={() => setIsIconLoading(false)}
        source={
          uri.toLowerCase().includes('jpg') ||
          uri.toLowerCase().includes('jpeg') ||
          uri.toLowerCase().includes('png') ||
          uri.toLowerCase().includes('gif')
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
    </View>
  )
}

export default MessageFile

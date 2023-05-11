import React from 'react'
import { TouchableOpacity, Text, View, Image } from 'react-native-web'
import styles from './styles'

const ElementNotView = ({ handler, fileName, icon }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={handler}>
      <Text style={styles.itemText}>{fileName}</Text>
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image
          style={
            icon.hasOwnProperty('uri')
              ? { width: '90%', height: '90%' }
              : { width: 150, height: 150 }
          }
          source={icon}
          resizeMode={'contain'}
        />
      </View>
    </TouchableOpacity>
  )
}

export default ElementNotView

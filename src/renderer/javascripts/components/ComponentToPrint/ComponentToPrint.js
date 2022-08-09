import React, { forwardRef } from 'react'
import { View, Text } from 'react-native-web'
import { QRCodeSVG } from 'qrcode.react'
import styles from './styles'

const ComponentToPrint = forwardRef(({ name, id }, ref) => {
  return (
    <View style={styles.unvisibleContainer}>
      <View ref={ref} style={styles.printContainer}>
        <Text style={styles.text}>{id}</Text>
        <Text style={styles.text}>{name}</Text>
        <QRCodeSVG value={id} size={300} />
      </View>
    </View>
  )
})

export default ComponentToPrint

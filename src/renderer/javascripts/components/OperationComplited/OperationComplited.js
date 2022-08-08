import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native-web'
import styles from './styles'

const OperationComplited = ({ setIsOperationComplited }) => {
  const buttonHandler = () => {
    setIsOperationComplited(false)
  }
  return (
    <View style={styles.container}>
      <View style={styles.alertContainer}>
        <Text style={styles.alertText}>Your operation has been completed!</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.alertButton}
          onPress={buttonHandler}
        >
          <Text style={styles.alertText}>OK!</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default OperationComplited

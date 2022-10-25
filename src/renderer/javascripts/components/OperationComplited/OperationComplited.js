import React, { useMemo } from 'react'
import { View, Text, TouchableOpacity } from 'react-native-web'
import { useSelector } from 'react-redux'
import { MainTranslate } from '../../Constants'
import styles from './styles'

const OperationComplited = ({ setIsOperationComplited }) => {
  const language = useSelector((state) => state.main.language)
  const translate = useMemo(() => new MainTranslate(language), [language])

  const buttonHandler = () => {
    setIsOperationComplited(false)
  }
  return (
    <View style={styles.container}>
      <View style={styles.alertContainer}>
        <Text style={styles.alertText}>{translate.getFinishOrderAlert()}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.alertButton}
          onPress={buttonHandler}
        >
          <Text style={[styles.alertText, { color: '#fff' }]}>OK!</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default OperationComplited

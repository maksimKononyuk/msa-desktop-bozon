import React from 'react'
import { View, Text } from 'react-native-web'
import { useSelector } from 'react-redux'
import styles from '../../styles/Styles'
import componentStyles from './styles'

const OperationContainer = () => {
  const name = useSelector((state) => state.main.activeOrder?.description?.name)
  return (
    <View
      style={[
        styles.operationContainer,
        {
          paddingLeft: 25,
          backgroundColor: 'transparent'
        }
      ]}
    >
      <Text style={componentStyles.operationText}>Operation</Text>
      <Text style={componentStyles.descriptionNameText}>{name}</Text>
    </View>
  )
}

export default OperationContainer

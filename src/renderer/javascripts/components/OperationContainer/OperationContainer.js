import React, { useMemo } from 'react'
import { View, Text } from 'react-native-web'
import { useSelector } from 'react-redux'
import styles from '../../styles/Styles'
import componentStyles from './styles'
import { OperationContainerTranslate } from '../../Constants'

const OperationContainer = () => {
  const name = useSelector((state) => state.main.activeOrder?.description?.name)

  const language = useSelector((state) => state.main.language)
  const translate = useMemo(
    () => new OperationContainerTranslate(language),
    [language]
  )

  return (
    <View
      style={[
        styles.operationContainer,
        {
          paddingLeft: 25,
          backgroundColor: 'transparent',
          maxHeight: '60%',
          overflow: 'auto'
        }
      ]}
    >
      <Text style={componentStyles.operationText}>
        {translate.getTitleLabel()}
      </Text>
      <Text style={componentStyles.descriptionNameText}>{name}</Text>
    </View>
  )
}

export default OperationContainer

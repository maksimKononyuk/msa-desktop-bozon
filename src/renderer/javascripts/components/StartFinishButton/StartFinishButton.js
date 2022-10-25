import React, { useMemo } from 'react'
import { View, TouchableOpacity, Image, Text, Alert } from 'react-native-web'
import { useDispatch, useSelector } from 'react-redux'
import { setModalVisible, setIsConfirmation } from '../../redux/actionCreators'
import styles from '../../styles/Styles'
import componentStyles from './styles'
import { StartFinishButtonTranslate } from '../../Constants'
import okIcon from '../../assets/images/ok.png'
import closeIcon from '../../assets/images/close.png'

const StartFinishButton = ({ startOrder }) => {
  const dispatch = useDispatch()
  const orderStarted = useSelector((state) => state.main.orderStarted)
  const isConfirmation = useSelector((state) => state.main.isConfirmation)
  const selectedItems = useSelector((state) => state.main.selectedItems)
  const isEquipmentEmpty = useSelector(
    (state) => state.startFinishButton.isEquipmentEmpty
  )

  const language = useSelector((state) => state.main.language)
  const translate = useMemo(
    () => new StartFinishButtonTranslate(language),
    [language]
  )

  return (
    <View style={componentStyles.container}>
      {isConfirmation ? (
        <View style={componentStyles.okCloseButtonsContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              componentStyles.buttonContainer,
              { backgroundColor: orderStarted ? '#029C6E' : '#0080FF' }
            ]}
            onPress={
              orderStarted
                ? () => dispatch(setModalVisible(true))
                : () => startOrder()
            }
          >
            <Image source={okIcon} style={componentStyles.okIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              componentStyles.buttonContainer,
              { backgroundColor: '#2D2D2D' }
            ]}
            onPress={() => dispatch(setIsConfirmation(false))}
          >
            <Image source={closeIcon} style={componentStyles.closeIcon} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            ...styles.container,
            backgroundColor: orderStarted
              ? '#009C6D'
              : selectedItems.length > 0 || isEquipmentEmpty
              ? '#0080FF'
              : 'gray'
          }}
          onPress={() => {
            orderStarted
              ? dispatch(setIsConfirmation(true))
              : isEquipmentEmpty || selectedItems.length > 0
              ? dispatch(setIsConfirmation(true))
              : Alert.alert(translate.getStartAlert())
          }}
        >
          <Text style={componentStyles.titleText}>
            {orderStarted
              ? translate.getFinishLable()
              : translate.getStartLable()}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default StartFinishButton

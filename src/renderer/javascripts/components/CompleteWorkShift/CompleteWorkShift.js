import React, { useMemo } from 'react'
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native-web'
import done from '../../assets/images/ok.png'
import cancel from '../../assets/images/no.png'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import {
  setIsCompleteWorkShiftVisible,
  setIsUserMenuModal
} from '../../redux/actionCreators'
import { CompleteWorkShiftTranslate } from '../../Constants'

const CompleteWorkShift = ({ handler, completeWorkShiftVisibleParam }) => {
  const dispatch = useDispatch()
  const isOrderStarted = useSelector((state) => state.main.orderStarted)
  const language = useSelector((state) => state.main.language)
  const translate = useMemo(
    () => new CompleteWorkShiftTranslate(language),
    [language]
  )
  return (
    <Modal animationType='slide' transparent={true} visible={true}>
      <View style={styles.container}>
        <Text style={styles.modalTitle}>
          {completeWorkShiftVisibleParam === 'shift'
            ? translate.getInfoLableShift()
            : isOrderStarted
            ? translate.getInfoLabelExitIsOrderStarted()
            : translate.getInfoLableExit()}
        </Text>
        <View style={styles.buttonBlock}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.button, styles.greenButton]}
            onPress={
              !isOrderStarted
                ? () => {
                    handler()
                  }
                : () => {
                    dispatch(setIsCompleteWorkShiftVisible(false))
                    dispatch(setIsUserMenuModal(false))
                  }
            }
          >
            {!isOrderStarted && <Image source={done} style={styles.okButton} />}
            <Text style={styles.buttonText}>
              {!isOrderStarted ? translate.getYesLable() : 'OK'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.button, styles.redButton]}
            onPress={
              !isOrderStarted
                ? () => dispatch(setIsCompleteWorkShiftVisible(false))
                : () => {
                    dispatch(setIsCompleteWorkShiftVisible(false))
                    dispatch(setIsUserMenuModal(false))
                  }
            }
          >
            {!isOrderStarted && (
              <Image source={cancel} style={styles.noButton} />
            )}
            <Text style={styles.buttonText}>
              {' '}
              {!isOrderStarted
                ? translate.getNoLable()
                : language === 'en'
                ? 'Cancel'
                : 'Отмена'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default CompleteWorkShift

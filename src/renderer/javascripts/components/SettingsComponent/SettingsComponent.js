import React, { useMemo, useState, useEffect } from 'react'
import { View, Text, Modal } from 'react-native-web'
import OKButton from '../OKButton/OKButton'
import CancelButton from '../CancelButton/CancelButton'
import SettingsComponentItem from '../SettingsComponentItem/SettingsComponentItem'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage, setIsUserMenuModal } from '../../redux/actionCreators'
import {
  SettingsComponentTranslate,
  UserMenuModalTranslate
} from '../../Constants'
import axios from 'axios'
import styles from './styles'
import packageJson from '../../../../../package.json'

const SettingsComponent = ({ setIsSettingsVisible }) => {
  const dispatch = useDispatch()
  const globalLanguage = useSelector((state) => state.main.language)
  const [hosting, setHosting] = useState(axios.defaults.baseURL)
  const [language, setStateLanguage] = useState(globalLanguage)
  const translate = useMemo(
    () => new SettingsComponentTranslate(language),
    [language]
  )
  const translateUserMenuModal = useMemo(
    () => new UserMenuModalTranslate(language),
    [language]
  )
  useEffect(() => {
    const setHost = () => {
      const host = localStorage.getItem('hosting')
      if (host) setHosting(host)
    }
    setHost()
  }, [])
  const changeLanguageHandler = (itemValue) => {
    setStateLanguage(itemValue)
  }

  const changeHostingHandler = (hosting) => {
    setHosting(hosting)
  }
  const canselHandler = () => {
    setIsSettingsVisible((prev) => !prev)
    dispatch(setIsUserMenuModal(false))
  }
  const okButtonHandler = () => {
    subscribeForEntries.setLanguageInMainProcess(language)
    localStorage.setItem('lang', language)
    localStorage.setItem('hosting', hosting)
    dispatch(setLanguage(language))
    axios.defaults.baseURL = hosting
    canselHandler()
  }
  return (
    <Modal animationType='slide' transparent={true} visible={true}>
      <View style={styles.container}>
        <View>
          <View style={styles.modalTitleBlock}>
            <Text style={styles.modalTitle}>
              {translate.getSettingsLabel()}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 25 }}>
            <SettingsComponentItem
              title={translate.getHostingLabel()}
              type={'input'}
              value={hosting}
              handler={changeHostingHandler}
            />
            <SettingsComponentItem
              title={translate.getLanguageLabel()}
              selectedObjects={[
                { label: translate.getEnglishLabel(), value: 'en' },
                { label: translate.getRussianLabel(), value: 'ru' }
              ]}
              value={language}
              handler={changeLanguageHandler}
              type={'picker'}
            />
          </View>
        </View>
        <View>
          <View style={styles.buttonContainer}>
            <OKButton handler={okButtonHandler} />
            <CancelButton handler={canselHandler} />
          </View>
          <Text style={styles.versionText}>
            {`${translateUserMenuModal.getVersionLabel()}: ${
              packageJson.version
            }`}
          </Text>
        </View>
      </View>
    </Modal>
  )
}

export default SettingsComponent

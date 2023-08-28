import React, { useEffect, useState, useMemo } from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native-web'
import styles from '../../styles/Styles'
import componentStyles from './styles'
import axios from 'axios'
import CompleteWorkShift from '../CompleteWorkShift/CompleteWorkShift'
import UserMenuItem from '../UserMenuItem/UserMenuItem'
import SettingsComponent from '../SettingsComponent/SettingsComponent'
import {
  setIsUserMenuModal,
  setIsCompleteWorkShiftVisible,
  setUserMenuOrders,
  setTempDetail,
  setCreatedOrderId,
  setIsErrorComponentVisible,
  setErrorMessage
} from '../../redux/actionCreators'
import { useDispatch, useSelector } from 'react-redux'
import { UserMenuModalTranslate } from '../../Constants'
import CancelButton from '../CancelButton/CancelButton'
import OKButton from '../OKButton/OKButton'
import packageJson from '../../../../../package.json'
import closeIcon from '../../assets/images/close.png'
// import ErrorComponent from '../ErrorComponent/ErrorComponent'

const UsersMenuModal = ({ logOut }) => {
  const [isModalNewOrder, setIsModalNewOrder] = useState(false)
  const [isModalGetDetails, setIsModalGetDetails] = useState(false)
  const [isFileSystemVisible, setIsFileSystemVisible] = useState(false)
  const [fsStorage, setFsStorage] = useState('*******')
  const [isAboutPlatform, setIsAboutPlatform] = useState(false)

  const dispatch = useDispatch()
  const activeOrder = useSelector((state) => state.main.activeOrder)
  const isCompleteWorkShiftVisible = useSelector(
    (state) => state.usersMenuModal.isCompleteWorkShiftVisible
  )
  const orders = useSelector((state) => state.usersMenuModal.orders)
  const tempDetail = useSelector((state) => state.usersMenuModal.tempDetail)
  const createdOrderId = useSelector(
    (state) => state.usersMenuModal.createdOrderId
  )

  const isErrorComponentVisible = useSelector(
    (state) => state.error.isCompleteWorkShiftVisible
  )

  const [isSettingsVisible, setIsSettingsVisible] = useState(false)
  const language = useSelector((state) => state.main.language)
  const translate = useMemo(
    () => new UserMenuModalTranslate(language),
    [language]
  )

  const [completeWorkShiftVisibleParam, setCompleteWorkShiftVisibleParam] =
    useState('exit')

  const textInputHandler = (text, key) => {
    dispatch(setTempDetail(text, key))
  }

  const sendingOrderForExecution = () => {
    axios
      .post('worker_order_execution', {
        _id: createdOrderId,
        s_id: tempDetail.stream,
        worker: {
          o_id: tempDetail.worker.o_id,
          w_id: tempDetail.order.composition['Worker id'],
          name: tempDetail.order.composition['Worker']
        }
      })
      .then((res) => dispatch(setIsUserMenuModal(false)))
      .catch((err) => {
        console.log('Network error when sending an order for execution ' + err)
        dispatch(setErrorMessage('when sending an order for execution ' + err))
        dispatch(setIsErrorComponentVisible(true))
      })
  }

  useEffect(() => {
    if (createdOrderId && tempDetail.stream) sendingOrderForExecution()
    return () => dispatch(setCreatedOrderId(null))
  }, [createdOrderId])

  const menuItemHandler = async (item) => {
    const user = JSON.parse(localStorage.getItem('user'))
    item.order.composition['Worker'] = user.name
    item.order.composition['Worker id'] = user.u_id
    dispatch(setTempDetail(item))
    setIsModalNewOrder(false)
    setIsModalGetDetails(true)
  }

  const getNewOrder = async () => {
    axios
      .get('deskbook_info/61f5b6541f1d04747fffe837')
      .then((res) => {
        dispatch(setUserMenuOrders(Object.values(res.data[0].value)))
        setIsModalNewOrder(true)
      })
      .catch((err) => {
        console.log(
          'Network error when receiving orders in the user menu ' + err
        )
        dispatch(
          setErrorMessage('when receiving orders in the user menu ' + err)
        )
        dispatch(setIsErrorComponentVisible(true))
      })
  }

  const sendFormData = () => {
    axios
      .post('worker_new_order_pending', {
        type: 'template',
        name: tempDetail.order.name,
        composition: {
          'What to deliver?': tempDetail.order.composition['What to deliver?'],
          'Detail id': tempDetail.order.composition['Detail id'],
          Workplace: tempDetail.order.composition['Workplace'],
          Worker: tempDetail.order.composition['Worker'],
          'Worker id': tempDetail.order.composition['Worker id']
        }
      })
      .then((res) => dispatch(setCreatedOrderId(res.data)))
      .catch((err) => {
        console.log('Network error when sending form data ' + err)
        dispatch(setErrorMessage('when sending form data ' + err))
        dispatch(setIsErrorComponentVisible(true))
      })
      .finally(() => {
        setIsModalGetDetails(false)
        setIsModalNewOrder(false)
      })
  }

  const getStorage = () => {
    subscribeForEntries.subGetStorage((event, data) => {
      setFsStorage(data)
    })
    subscribeForEntries.getStorage()
  }

  const setStorage = () => {
    subscribeForEntries.setStorage(activeOrder)
  }

  const deleteStorage = () => {
    subscribeForEntries.deleteStorage()
    getStorage()
  }

  return (
    <Modal animationType='slide' transparent={true} visible={true}>
      <View style={componentStyles.container}>
        {!isModalGetDetails && !isModalNewOrder && !isFileSystemVisible && (
          <>
            <View style={componentStyles.menuItemBlock}>
              <View style={componentStyles.closeContainer}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={componentStyles.closeContainerButton}
                  onPress={() => dispatch(setIsUserMenuModal(false))}
                >
                  <Image
                    style={componentStyles.closeContainerButtonImage}
                    source={closeIcon}
                  />
                </TouchableOpacity>
              </View>
              {/* <UserMenuItem
                title={translate.getNewOrderLabel()}
                handler={getNewOrder}
              /> */}
              <UserMenuItem
                title={translate.getSettingsLabel()}
                handler={() => setIsSettingsVisible((prev) => !prev)}
              />
              {/* <UserMenuItem
                title={translate.getLogoutLabel()}
                handler={() => {
                  setCompleteWorkShiftVisibleParam('shift')
                  dispatch(setIsCompleteWorkShiftVisible(true))
                }}
              /> */}
              {/* <UserMenuItem
                title={translate.getFileSystemLabel()}
                handler={() => setIsFileSystemVisible(true)}
              /> */}
              <UserMenuItem
                title={translate.getExitLabel()}
                handler={() => {
                  setCompleteWorkShiftVisibleParam('exit')
                  dispatch(setIsCompleteWorkShiftVisible(true))
                }}
              />
            </View>
            <View style={componentStyles.versionContainer}>
              <Text style={styles.versionText}>
                {`${translate.getVersionLabel()}: ${packageJson.version}`}
              </Text>
              <Text
                style={[
                  styles.versionText,
                  { lineHeight: 14, marginVertical: 14 }
                ]}
              >
                {translate.getRightsLabel() + '\n'}
                {translate.getDigitalPlatformLabel()}
              </Text>
              {language === 'ru' && (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => setIsAboutPlatform(true)}
                >
                  <Text style={styles.versionText}>
                    О программном обеспечении
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
        {isModalNewOrder && (
          <>
            <View style={componentStyles.orderContainer}>
              <Text
                style={[
                  componentStyles.menuItemText,
                  componentStyles.newOrderText
                ]}
              >
                {translate.getNewOrderLabel()}
              </Text>
              <View style={componentStyles.menuItemBlock}>
                {orders.map((item, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={componentStyles.menuItem}
                      key={index}
                      onPress={() => menuItemHandler(item)}
                    >
                      <Text style={componentStyles.menuItemText}>
                        {item?.order?.name || ''}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </View>
            <CancelButton handler={() => setIsModalNewOrder(false)} />
          </>
        )}
        {isModalGetDetails && (
          <>
            <View style={componentStyles.orderContainer}>
              <Text style={componentStyles.orderNameText}>
                {tempDetail?.order?.name}
              </Text>
              <View style={componentStyles.scroll}>
                {tempDetail.order &&
                  Object.entries(tempDetail.order.composition)
                    .sort()
                    .map(([key, value]) => (
                      <View
                        style={componentStyles.whatToDeliverContainer}
                        key={key}
                      >
                        <Text style={componentStyles.whatToDeliverText}>
                          {key}
                        </Text>
                        <TextInput
                          style={componentStyles.input}
                          value={value}
                          onChangeText={(text) => {
                            textInputHandler(text, key)
                          }}
                        />
                      </View>
                    ))}
              </View>
              <OKButton handler={sendFormData} />
              <CancelButton
                handler={() => {
                  setIsModalGetDetails(false)
                  setIsModalNewOrder(true)
                }}
              />
            </View>
          </>
        )}
        {isFileSystemVisible && (
          <>
            <View style={componentStyles.orderContainer}>
              <Text
                style={[
                  componentStyles.menuItemText,
                  componentStyles.newOrderText
                ]}
              >
                {translate.getFileSystemLabel()}
              </Text>
              <View style={componentStyles.getSetButtons}>
                <TouchableOpacity
                  onPress={getStorage}
                  activeOpacity={0.5}
                  style={styles.cancelContainer}
                >
                  <Text style={componentStyles.cancelText}>Get Storage</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={setStorage}
                  activeOpacity={0.5}
                  style={styles.cancelContainer}
                >
                  <Text style={componentStyles.cancelText}>Set Storage</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={deleteStorage}
                  activeOpacity={0.5}
                  style={styles.cancelContainer}
                >
                  <Text style={componentStyles.cancelText}>Delete Storage</Text>
                </TouchableOpacity>
              </View>
              <View style={componentStyles.storageBlock}>
                <Text>{fsStorage}</Text>
              </View>
            </View>
            <CancelButton handler={() => setIsFileSystemVisible(false)} />
          </>
        )}
        <Modal
          animationType='slider'
          transparent={false}
          visible={isAboutPlatform}
        >
          <View style={componentStyles.aboutPlatformModal}>
            <View style={componentStyles.aboutPlatformContainer}>
              <TouchableOpacity
                onPress={() => setIsAboutPlatform(false)}
                activeOpacity={0.5}
                style={componentStyles.closeBlockAboutPlatform}
              >
                <View
                  style={[
                    componentStyles.closeBlockAboutPlatformLines,
                    componentStyles.closeBlockAboutPlatformLine1
                  ]}
                ></View>
                <View
                  style={[
                    componentStyles.closeBlockAboutPlatformLines,
                    componentStyles.closeBlockAboutPlatformLine2
                  ]}
                ></View>
              </TouchableOpacity>
              <View>
                <Text style={componentStyles.aboutPlatformTitleText}>
                  О MSA платформе
                </Text>
                <Text style={componentStyles.aboutPlatformRightsText}>
                  {'© 2023 Все права защищены.' + ' '}
                  Цифровая платформа MSA.
                </Text>
              </View>
              <div style={componentStyles.aboutPlatformContentText}>
                <div>Использование продукта регламентируется</div>
                <span
                  onClick={() =>
                    subscribeForEntries.openExternal(
                      'https://msaplatforma.ru/terms/'
                    )
                  }
                  style={{ color: '#007AFC', cursor: 'pointer' }}
                >
                  {'лицензионным договором MSA,' + ' '}
                </span>
                если не указано иное.
              </div>
              <Text style={componentStyles.aboutPlatformContentText}>
                Продукт включает программное обеспечение, разработанное ООО «МСА
                ПЛАТФОРМА».
              </Text>
            </View>
          </View>
        </Modal>
        {isCompleteWorkShiftVisible && (
          <CompleteWorkShift
            handler={
              completeWorkShiftVisibleParam === 'shift'
                ? logOut
                : () => {
                    logOut()
                    subscribeForEntries.quitApp()
                  }
            }
            completeWorkShiftVisibleParam={completeWorkShiftVisibleParam}
          />
        )}
        {isSettingsVisible && (
          <SettingsComponent setIsSettingsVisible={setIsSettingsVisible} />
        )}
        {/* {isErrorComponentVisible && <ErrorComponent />} */}
      </View>
      {/* {isErrorComponentVisible && <ErrorComponent />} */}
    </Modal>
  )
}

export default UsersMenuModal

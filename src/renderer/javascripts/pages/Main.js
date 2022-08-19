import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { View, Modal, ActivityIndicator, Text } from 'react-native-web'
import Carousel from '../components/Carousel/CarouselComponent'
import axios from 'axios'
import Header from '../components/Header/Header'
import Orders from '../components/Orders/Orders'
import ActiveOrder from '../components/ActiveOrder/ActiveOrder'
// import BarCode from '../components/BarCode/BarCode'
import TechMaps from '../components/TechMaps/TechMaps'
import ActiveOrderHeader from '../components/Adaptive/ActiveOrderHeader'
import RightBlock from '../components/Adaptive/RightBlock'
import OrderCancelModal from '../components/OrderCancelModal/OrderCancelModal'
import Messages from '../components/Messages/Messages'
// import OperationContainer from '../components/OperationContainer/OperationContainer'
// import styles from '../styles/Styles'
import Materials from '../components/Materials/Materials'
import Equipment from '../components/Equipment/Equipment'
// import Timer from '../components/Timer/Timer'
// import StartFinishButton from '../components/StartFinishButton/StartFinishButton'
import OperationResult from '../components/OperationResult/OperationResult'
import { useSelector, useDispatch } from 'react-redux'
import {
  setOrders,
  setUser,
  setActiveOrder,
  setOrderStarted,
  setModalVisible,
  setOrderCancelModalVisible,
  setPreviousOperation,
  setIsConfirmation,
  setEquipmentArr,
  setIsEquipmentLoading,
  setIsEquipmentVisible,
  setIsEquipmentEmpty,
  setSelectedItemsUnCheced,
  setIsCheckedArr,
  setIsLoading,
  setIsUserMenuModal,
  setIsCompleteWorkShiftVisible,
  setIsErrorComponentVisible,
  setErrorMessage,
  setShowMaterialsComponent,
  setMaterialsArr,
  setActiveIndex,
  setMessages
} from '../redux/actionCreators'
import OperationComplited from '../components/OperationComplited/OperationComplited'
import addNotification, { Notifications } from 'react-push-notification'
import soundNitify from '../assets/sounds/sound.mp3'
// import ErrorComponent from '../components/ErrorComponent/ErrorComponent'

const Main = () => {
  let ordersCount = 0
  const navigate = useNavigate()
  const { state } = useLocation()
  const dispatch = useDispatch()

  const isPlaySound = useSelector((state) => state.main.isPlaySound)
  const sound = useSelector((state) => state.activeOrder?.sound)

  const user = useSelector((state) => state.main.user)
  const orders = useSelector((state) => state.main.orders)
  const activeOrder = useSelector((state) => state.main.activeOrder)
  const activeIndex = useSelector((state) => state.main.activeIndex)
  const activeBarCode = useSelector((state) => state.main.activeBarCode)
  const modalVisible = useSelector((state) => state.main.modalVisible)
  const orderCancelModalVisible = useSelector((state) => {
    state.main.orderCancelModalVisible
  })
  const showMaterialsComponent = useSelector(
    (state) => state.main.showMaterialsComponent
  )
  const materialsArr = useSelector((state) => state.main.materialsArr)
  const equipmentArr = useSelector((state) => state.main.equipmentArr)
  const isEquipmentLoading = useSelector(
    (state) => state.main.isEquipmentLoading
  )
  const isEquipmentVisible = useSelector(
    (state) => state.main.isEquipmentVisible
  )
  const selectedItems = useSelector((state) => state.main.selectedItems)
  const orderStarted = useSelector((state) => state.main.orderStarted)

  const isErrorComponentVisible = useSelector(
    (state) => state.error.isErrorComponentVisible
  )

  const [operationFinishLoading, setOperationFinishLoading] = useState(false)
  const [isOperationComplited, setIsOperationComplited] = useState(false)

  const equipmentBusy = (isBusy) => {
    axios
      .put(
        'equipment_busy',
        selectedItems.map((item) => ({
          _id: item,
          occupied: isBusy
        }))
      )
      .catch((err) => {
        console.log('Network error when releasing equipment ' + err)
        dispatch(setErrorMessage('when releasing equipment ' + err))
        dispatch(setIsErrorComponentVisible(true))
      })
  }

  const logOut = () => {
    axios
      .put('worker_in', {
        _id: user.u_id,
        at_work: false
      })
      .then(async () => {
        localStorage.clear()
        navigate('/')
        dispatch(setOrders([]))
        dispatch(setIsUserMenuModal(false))
        dispatch(setOrderStarted(false))
        dispatch(setIsCompleteWorkShiftVisible(false))
      })
      .catch((err) => {
        console.log('Network error when logging out ' + err)
        dispatch(setErrorMessage('when logging out ' + err))
        dispatch(setIsErrorComponentVisible(true))
      })
    equipmentBusy(false)
  }

  const getOrders = (user) => {
    user.u_id &&
      axios
        .get(`order_worker/${user.u_id}`)
        .then((res) => {
          dispatch(setOrders(res.data))
          if (res.data.length > ordersCount) {
            notificationCall()
          }
          ordersCount = res.data.length
          if (res.data.length) {
            getOrderInfo(res.data[0]._id, user.u_id)
            getPreviousOperation(user)
          }
        })
        .catch((err) => {
          console.log('Network error when receiving orders ' + err)
          // dispatch(setErrorMessage('when receiving orders ' + err))
          // dispatch(setIsErrorComponentVisible(true))
        })
  }

  const getPreviousOperation = (user) => {
    axios
      .get(`order_prev_operation/${user.u_id}`)
      .then((res) => {
        dispatch(setPreviousOperation(res.data))
      })
      .catch((err) => {
        console.log(
          'Network error when receiving the previous operation ' + err
        )
        dispatch(
          setErrorMessage('when receiving the previous operation ' + err)
        )
        dispatch(setIsErrorComponentVisible(true))
      })
  }

  const getOrderInfo = (activeOrderId, userId) => {
    axios
      .get(`order_id_worker/${activeOrderId}/${userId}`)
      .then((res) => {
        dispatch(setActiveOrder(res.data[0]))
      })
      .catch((err) => {
        console.log('Network error when receiving an active order ' + err)
        dispatch(setErrorMessage('when receiving an active order ' + err))
        dispatch(setIsErrorComponentVisible(true))
      })
  }

  const startOrder = () => {
    dispatch(setIsEquipmentVisible(false))
    axios
      .put('order_worker_start', {
        order_id: activeOrder?._id,
        stream_id: activeOrder?.s_id,
        operation_id: activeOrder?.operation?._id
      })
      .then(() => {
        dispatch(setIsConfirmation(false))
        dispatch(setOrderStarted(true))
      })
      .catch((err) => {
        console.log('Network error at the start of the operation ' + err)
        dispatch(setErrorMessage('at the start of the operation ' + err))
        dispatch(setIsErrorComponentVisible(true))
      })
    equipmentBusy(true)
  }

  const finishOrder = (nextOperationId, relationId) => {
    setOperationFinishLoading(true)
    axios
      .put('order_worker_finish', {
        order_id: activeOrder?._id,
        stream_id: activeOrder?.s_id,
        next_operation_id: nextOperationId,
        current_operation_id: activeOrder?.operation?._id,
        relation_id: relationId,
        function: materialsArr
      })
      .then(() => {
        setIsOperationComplited(true)
        setOperationFinishLoading(false)
        dispatch(setModalVisible(false))
        dispatch(setOrderStarted(false))
        dispatch(setMaterialsArr([]))
        dispatch(setShowMaterialsComponent(false))
        dispatch(setActiveIndex(1))
        dispatch(setMessages([]))
      })
      .catch((err) => {
        console.log('Network error at the end of the operation ' + err)
        dispatch(setErrorMessage('at the end of the operation ' + err))
        dispatch(setIsErrorComponentVisible(true))
      })
    equipmentBusy(false)
    dispatch(setSelectedItemsUnCheced('all'))
    dispatch(setIsCheckedArr('empty'))
    dispatch(setIsEquipmentVisible(true))
  }

  const equipmentRequest = (operationId) => {
    if (operationId) {
      axios
        .get(`equipment_o_id/${operationId}`)
        .then((res) => {
          dispatch(setEquipmentArr(res.data))
          res.data.length === 0 && dispatch(setIsEquipmentEmpty(true))
          res.data.length > 0 && dispatch(setIsEquipmentEmpty(false))
          dispatch(setIsLoading(false))
          isEquipmentLoading && dispatch(setIsEquipmentLoading(false))
        })
        .catch((err) => {
          console.log('Network error when receiving equipment ' + err)
          dispatch(setErrorMessage('when receiving equipment ' + err))
          dispatch(setIsErrorComponentVisible(true))
        })
    }
  }

  useEffect(() => {
    let checkCancelOrder
    if (orderStarted) {
      checkCancelOrder = setInterval(async () => {
        await axios
          .get(`order_worker_active/${user.u_id}`)
          .then(async (res) => {
            if (res.data.length) {
              clearInterval(checkCancelOrder)
              // Alert.alert('MSA Mobile', 'Your order has been cancelled.')
              dispatch(setOrderCancelModalVisible(true))
              dispatch(setOrderStarted(false))
            }
          })
          .catch((err) => {
            console.log('Network error when checking order activity ' + err)
            dispatch(setErrorMessage('when checking order activity ' + err))
            dispatch(setIsErrorComponentVisible(true))
          })
      }, 10000)
    }
    return () => clearInterval(checkCancelOrder)
  }, [orderStarted])

  useEffect(() => {
    let appInterval
    if (activeOrder) {
      equipmentRequest(activeOrder.description.o_id)
      appInterval = setInterval(() => {
        equipmentRequest(activeOrder.description.o_id)
      }, 2000)
    }
    return () => clearInterval(appInterval)
  }, [activeOrder?.description.o_id])

  useEffect(() => {
    let getOrdersInterval
    let checkLogout
    async function getData() {
      const tempUser = JSON.parse(localStorage.getItem('user'))
      dispatch(setUser(tempUser))

      getOrdersInterval = setInterval(() => {
        getOrders(tempUser)
      }, 2000)

      checkLogout = setInterval(async () => {
        await axios
          .get(`worker_logout/${tempUser.u_id}`)
          .then(async (res) => {
            if (res.data[0].at_work === false) {
              clearInterval(checkLogout)
              localStorage.clear()
              Updates.reloadAsync()
              Alert.alert(
                'MSA Mobile',
                'You have been logged out by the administrator.'
              )
            }
          })
          .catch((err) => {
            console.log(
              'Network error when checking for logging out by the administrator ' +
                err
            )
            dispatch(
              setErrorMessage(
                'when checking for logging out by the administrator ' + err
              )
            )
            dispatch(setIsErrorComponentVisible(true))
          })
      }, 10000)
    }

    getData()
    return () => {
      clearInterval(getOrdersInterval)
      clearInterval(checkLogout)
    }
  }, [])

  useEffect(() => {
    if (modalVisible) dispatch(setIsConfirmation(false))
  }, [modalVisible])

  const notify = () => {
    addNotification({
      duration: 5000,
      title: 'Warning',
      subtitle: 'New order',
      message: 'You have a new order',
      theme: 'darkblue',
      closeButton: 'X'
    })
  }

  const notificationCall = () => {
    notify()
    new Audio(soundNitify).play()
  }

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#fff',
        height: '100vh'
      }}
    >
      <Notifications />
      <Header logOut={logOut} userName={state.userName} />
      <Orders />
      {orders.length > 0 && (
        <View style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Carousel />
            {activeIndex === 0 && orders.length ? <Messages /> : null}
            {activeIndex === 1 && orders.length ? (
              <>
                <ActiveOrderHeader />
                {isEquipmentLoading ? (
                  <ActivityIndicator
                    style={{ flex: 1 }}
                    size='large'
                    color='#000088'
                  />
                ) : equipmentArr.length === 0 || !isEquipmentVisible ? (
                  <ActiveOrder />
                ) : (
                  <Equipment equipmentRequest={equipmentRequest} />
                )}
              </>
            ) : null}
            {activeIndex === 2 ? <TechMaps /> : null}
          </View>
          <RightBlock startOrder={startOrder} />
        </View>
      )}
      {orderCancelModalVisible && <OrderCancelModal />}
      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => dispatch(setModalVisible(false))}
      >
        {operationFinishLoading && (
          <View
            style={{
              position: 'absolute',
              alignSelf: 'center',
              top: '50%',
              zIndex: 1
            }}
          >
            <ActivityIndicator size='large' color='#000088' />
          </View>
        )}
        {showMaterialsComponent ? (
          <Materials finishOrder={finishOrder} />
        ) : (
          <OperationResult finishOrder={finishOrder} />
        )}
      </Modal>
      {isOperationComplited && (
        <OperationComplited setIsOperationComplited={setIsOperationComplited} />
      )}
      {/* {isErrorComponentVisible && <ErrorComponent />} */}
    </View>
  )
}

export default Main

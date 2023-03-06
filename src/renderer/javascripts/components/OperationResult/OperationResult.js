import React, { useMemo, useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native-web'
import styles from '../../styles/Styles'
import axios from 'axios'
import componentStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import {
  setModalVisible,
  setMaterialsArr,
  setShowMaterialsComponent,
  setFinishOrderParams,
  setErrorMessage,
  setIsErrorComponentVisible,
  setIsDegreeOfOperationComplation
} from '../../redux/actionCreators'
import { OperationResultTranslate } from '../../Constants'
import arrowWhiteIcon from '../../assets/images/arrow_white.png'
import CancelButton from '../CancelButton/CancelButton'
import closeIcon from '../../assets/images/close.png'
// import ErrorComponent from '../ErrorComponent/ErrorComponent'

const OperationResult = ({ finishOrder }) => {
  const dispatch = useDispatch()
  const activeOrder = useSelector((state) => state.main.activeOrder)
  const userId = useSelector((state) => state.main.user.u_id)
  const isErrorComponentVisible = useSelector(
    (state) => state.error.isErrorComponentVisible
  )

  const isDegreeOfOperationComplation = useSelector(
    (state) => state.startFinishButton.isDegreeOfOperationCompletion
  )

  const language = useSelector((state) => state.main.language)
  const translate = useMemo(
    () => new OperationResultTranslate(language),
    [language]
  )

  const [completely, setCompletely] = useState(false)

  const maretialsRequest = (index) => {
    if (activeOrder) {
      axios
        .get(`order_id_worker/${activeOrder._id}/${userId}/`)
        .then((res) =>
          dispatch(
            setMaterialsArr(res.data[0].operation.relation[index].function)
          )
        )
        .catch((err) => {
          console.log('Network error when receiving materials ' + err)
          dispatch(setErrorMessage('when receiving materials ' + err))
          dispatch(setIsErrorComponentVisible(true))
        })
    }
  }

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: '#fff',
        justifyContent: 'flex-start'
      }}
    >
      <View style={componentStyles.resultContainer}>
        <Text style={componentStyles.resultText}>
          {translate.getTitleLable()}
        </Text>
      </View>
      {isDegreeOfOperationComplation
        ? [0, 1].map((el) => (
            <TouchableOpacity
              key={el}
              activeOpacity={0.5}
              onPress={() => {
                setCompletely(el === 1)
                dispatch(setIsDegreeOfOperationComplation(false))
              }}
              style={{
                ...styles.center,
                ...styles.operationItem,
                backgroundColor: '#000'
              }}
            >
              <Text style={componentStyles.itemResultText}>
                {el === 0
                  ? language === 'en'
                    ? 'Partially completed'
                    : 'Выполнено частично'
                  : language === 'en'
                  ? 'Completed completely'
                  : 'Выполнено полностью'}
              </Text>
              <Image
                style={componentStyles.arrowIcon}
                source={arrowWhiteIcon}
              />
            </TouchableOpacity>
          ))
        : activeOrder?.operation.relation.map((elem, elIndex) => (
            <View
              key={elIndex}
              style={[
                componentStyles.unionRelationsBlock,
                { borderWidth: elem.length > 1 ? 1 : 0 }
              ]}
            >
              {elem.map((item, index) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    const isLast = index === elem.length - 1
                    dispatch(
                      setFinishOrderParams({
                        nextOperationId: item.so_id,
                        relationId: item._id,
                        isLast,
                        completely
                      })
                    )
                    elem.forEach((el, index) => {
                      if (item.function.length > 0 && isLast) {
                        maretialsRequest(index)
                        dispatch(setShowMaterialsComponent(true))
                      } else {
                        finishOrder(el.so_id, el._id, isLast, completely)
                      }
                    })
                  }}
                  key={item._id}
                  style={{
                    ...styles.center,
                    ...styles.operationItem,
                    backgroundColor: item.bgr_color
                  }}
                >
                  <Text style={componentStyles.itemResultText}>
                    {item.result}
                  </Text>
                  <Image
                    style={componentStyles.arrowIcon}
                    source={arrowWhiteIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>
          ))}
      <View style={componentStyles.canselButtonContainer}>
        <CancelButton handler={() => dispatch(setModalVisible(false))} />
      </View>
      {/* {isErrorComponentVisible && <ErrorComponent />} */}
    </View>
  )
}

export default OperationResult

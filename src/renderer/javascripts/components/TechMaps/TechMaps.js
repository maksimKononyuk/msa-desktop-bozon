import axios from 'axios'
import React, { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native-web'
// import AppIntroSlider from 'react-native-app-intro-slider'
// import ImageZoom from 'react-native-image-pan-zoom'
// import { Video } from 'expo-av'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import {
  setMapsArr,
  setErrorMessage,
  setIsErrorComponentVisible
} from '../../redux/actionCreators'

import ImageCorousel from '../ImageCarousel/ImageCarousel'

const TechMaps = () => {
  const dispatch = useDispatch()
  const operationId = useSelector(
    (state) => state.main.activeOrder?.description?.o_id
  )
  const mapsArr = useSelector((state) => state.TechMaps.mapsArr)

  useEffect(() => {
    axios
      .get(`order_worker_techmap/${operationId}`)
      .then((response) => {
        dispatch(setMapsArr(response.data[0].technical_maps))
      })
      .catch((err) => {
        console.log('Network error when receiving technical maps ' + err)
        dispatch(setErrorMessage('when receiving technical maps ' + err))
        dispatch(setIsErrorComponentVisible(true))
      })
  }, [])

  return (
    <View style={[styles.container, { height: '89%' }]}>
      {mapsArr?.length > 0 ? (
        <ImageCorousel />
      ) : (
        <ActivityIndicator size='large' color='#000088' />
      )}
    </View>
  )
}

export default TechMaps

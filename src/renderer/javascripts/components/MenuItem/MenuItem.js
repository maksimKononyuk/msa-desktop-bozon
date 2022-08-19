import React from 'react'
import { Text, TouchableOpacity } from 'react-native-web'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveIndex } from '../../redux/actionCreators'

import styles from '../../styles/Styles'

const MenuItem = ({ item, index }) => {
  const dispatch = useDispatch()
  const activeIndex = useSelector((state) => state.main.activeIndex)
  const orderStarted = useSelector((state) => state.main.orderStarted)
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{}}
      onPress={() => orderStarted && dispatch(setActiveIndex(index))}
    >
      <Text
        style={{
          fontFamily: 'Montserrat',
          fontSize: index === activeIndex ? 32 : 20,
          color: index === activeIndex ? '#000' : '#C8C8C8'
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  )
}

export default MenuItem

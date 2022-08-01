import React from 'react'
import { Text, TouchableOpacity } from 'react-native-web'
import { useSelector } from 'react-redux'

import styles from '../../styles/Styles'

const MenuItem = ({ item, index }) => {
  const activeIndex = useSelector((state) => state.main.activeIndex)
  const orderStarted = useSelector((state) => state.main.orderStarted)
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{}}
      onPress={() => orderStarted && console.log('Press')}
    >
      <Text
        style={{
          fontFamily: 'Montserrat',
          fontSize: index === activeIndex ? 18 : 16,
          color: index === activeIndex ? '#000' : '#444'
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  )
}

export default MenuItem

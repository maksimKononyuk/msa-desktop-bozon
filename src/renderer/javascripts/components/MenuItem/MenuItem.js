import React from 'react'
import { Text, TouchableOpacity } from 'react-native-web'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveIndex } from '../../redux/actionCreators'

const MenuItem = ({ item }) => {
  const dispatch = useDispatch()
  const activeIndex = useSelector((state) => state.main.activeIndex)
  const orderStarted = useSelector((state) => state.main.orderStarted)
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{}}
      onPress={() => orderStarted && dispatch(setActiveIndex(item.id))}
    >
      <Text
        style={{
          fontFamily: 'Montserrat',
          fontSize: item.id === activeIndex ? 32 : 20,
          color:
            item.id === activeIndex ? '#000' : orderStarted ? '#000' : '#C8C8C8'
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  )
}

export default MenuItem

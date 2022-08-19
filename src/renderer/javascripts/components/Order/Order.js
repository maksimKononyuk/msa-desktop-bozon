import React from 'react'
import { View, Text, Image } from 'react-native-web'

import styles from '../../styles/Styles'
import componentStyles from './styles'
import { useDispatch } from 'react-redux'

const Order = ({ item, icon }) => {
  const dispatch = useDispatch()

  return (
    <View
      style={[
        styles.orderContainer,
        { width: '25%', borderRightWidth: 0.5, borderRightColor: '#00000029' }
      ]}
    >
      <View style={componentStyles.qrItemName}>
        <Image source={icon} style={{ width: 16, height: 16 }}></Image>
        <View style={componentStyles.itemIdName}>
          <Text style={componentStyles.itemIdText}>{item._id}</Text>
          <Text
            style={componentStyles.itemNameText}
            numberOfLines={1}
            ellipsizeMode={'middle'}
          >
            {item.name}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Order

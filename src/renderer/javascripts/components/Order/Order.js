import React from 'react'
import { View, Text, Image } from 'react-native-web'

import styles from '../../styles/Styles'
import componentStyles from './styles'

const Order = ({ item, icon, idx }) => {
  return (
    <View
      style={[
        styles.orderContainer,
        {
          width: '25%',
          borderRightWidth: 0.5,
          borderRightColor: '#00000029',
          backgroundColor: idx === 0 ? '#EBEBEB' : '#fff'
        }
      ]}
    >
      <View style={componentStyles.qrItemName}>
        <Image
          source={icon}
          style={{ width: idx === 0 ? 16 : 8, height: idx === 0 ? 21 : 11 }}
        ></Image>
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

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
          borderBottomWidth: 0.5,
          borderRightWidth: 0.5,
          borderColor: '#00000008',
          backgroundColor: idx === 0 ? '#EBEBEBCC' : '#fff'
        }
      ]}
    >
      <View style={componentStyles.qrItemName}>
        <Image source={icon} style={{ width: 8, height: 11 }}></Image>
        <View style={componentStyles.itemIdName}>
          <Text style={componentStyles.itemIdText}>{item._id}</Text>
          <Text
            style={componentStyles.itemNameText}
            // numberOfLines={1}
            // ellipsizeMode={'middle'}
          >
            {item.name}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Order

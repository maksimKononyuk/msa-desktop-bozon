import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native-web'
import { QRCodeSVG } from 'qrcode.react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveBarCode } from '../../redux/actionCreators'

import styles from '../../styles/Styles'

const ActiveOrderHeader = () => {
  const dispatch = useDispatch()
  const activeBarCode = useSelector((state) => state.main.activeBarCode)
  const item = useSelector((state) => state.main.orders[0])

  const print = () => {
    console.log('print')
  }

  return (
    <View
      style={[
        styles.orderContainer,
        { backgroundColor: '#FFFFFF', width: '100%', paddingHorizontal: 20 }
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            activeBarCode
              ? dispatch(setActiveBarCode(false))
              : dispatch(setActiveBarCode(true))
          }}
        >
          <QRCodeSVG value={item._id} size={60} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
          <Text
            style={{ fontFamily: 'Roboto', fontSize: 26 }}
            numberOfLines={2}
            ellipsizeMode={'middle'}
          >
            {item.name}
          </Text>
          <Text style={{ color: '#8F8F8F' }}>{item._id}</Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={print}
        style={{
          width: 80,
          height: 40,
          backgroundColor: '#F0F0F0',
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text style={{ fontSize: 15 }}>Print</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ActiveOrderHeader

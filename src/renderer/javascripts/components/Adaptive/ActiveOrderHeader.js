import React, { useRef } from 'react'
import { View, Text, TouchableOpacity } from 'react-native-web'
import { QRCodeSVG } from 'qrcode.react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveBarCode } from '../../redux/actionCreators'
import { useReactToPrint } from 'react-to-print'
import ComponentToPrint from '../ComponentToPrint/ComponentToPrint'

import styles from '../../styles/Styles'

const ActiveOrderHeader = () => {
  const componentRef = useRef()
  const dispatch = useDispatch()
  const activeBarCode = useSelector((state) => state.main.activeBarCode)
  const item = useSelector((state) => state.main.orders[0])

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  return (
    <View
      style={[
        styles.orderContainer,
        { backgroundColor: '#FFFFFF', width: '100%', paddingHorizontal: 20 }
      ]}
    >
      {/**Component for print (unvisible) */}
      <ComponentToPrint ref={componentRef} name={item.name} id={item._id} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            activeBarCode
              ? dispatch(setActiveBarCode(false))
              : dispatch(setActiveBarCode(true))
          }}
        >
          <QRCodeSVG value={item._id} size={58} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
          <Text
            style={{ fontFamily: 'Montserrat', fontSize: 26 }}
            numberOfLines={2}
            ellipsizeMode={'middle'}
          >
            {item.name}
          </Text>
          <Text
            style={{ color: '#8F8F8F', fontFamily: 'Roboto', fontSize: 13 }}
          >
            {item._id}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handlePrint}
        style={{
          width: 80,
          height: 40,
          backgroundColor: '#E0E0E0',
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text style={{ fontSize: 15, fontFamily: 'Roboto' }}>print</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ActiveOrderHeader

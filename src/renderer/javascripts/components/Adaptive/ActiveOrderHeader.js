import React, { useRef, useMemo } from 'react'
import { View, Text, TouchableOpacity } from 'react-native-web'
import { QRCodeSVG } from 'qrcode.react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveBarCode } from '../../redux/actionCreators'
import { useReactToPrint } from 'react-to-print'
import ComponentToPrint from '../ComponentToPrint/ComponentToPrint'
import { ActiveOrderTranslate } from '../../Constants'

import styles from '../../styles/Styles'

const ActiveOrderHeader = () => {
  const componentRef = useRef()
  const dispatch = useDispatch()
  const activeBarCode = useSelector((state) => state.main.activeBarCode)
  const item = useSelector((state) => state.main.orders[0])
  const language = useSelector((state) => state.main.language)
  const translate = useMemo(
    () => new ActiveOrderTranslate(language),
    [language]
  )

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  return (
    <View
      style={[
        styles.orderContainer,
        {
          backgroundColor: '#FFFFFF',
          paddingHorizontal: 20,
          width: '100%',
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderColor: '#00000015'
        }
      ]}
    >
      {/**Component for print (unvisible) */}
      <ComponentToPrint ref={componentRef} name={item.name} id={item._id} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            // activeBarCode
            //   ? dispatch(setActiveBarCode(false))
            //   : dispatch(setActiveBarCode(true))
          }}
        >
          <QRCodeSVG value={item._id} size={58} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            marginLeft: 10,
            textAlign: 'left'
          }}
        >
          <Text
            style={{ fontFamily: 'Montserrat', fontSize: 26 }}
            // numberOfLines={2}
            // ellipsizeMode={'middle'}
          >
            {item.name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                color: '#8F8F8F',
                fontFamily: 'Roboto',
                fontSize: 13,
                marginLeft: 1
              }}
            >
              {item._id.slice(0, -5)}
            </Text>
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 13
              }}
            >
              {item._id.substr(item._id.length - 5)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handlePrint}
          style={{
            width: 80,
            height: 40,
            backgroundColor: '#e9e9e9',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10
          }}
        >
          <Text style={{ fontSize: 15, fontFamily: 'Roboto' }}>
            {translate.getPrintLabel()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ActiveOrderHeader

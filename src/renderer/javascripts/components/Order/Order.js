import React, { useEffect, useMemo } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native-web'
// import QRCode from 'react-native-qrcode-svg'
import { windowWidth } from '../../Constants'
// import * as Print from 'expo-print'
import styles from '../../styles/Styles'
import qrcode from '../../lib/createImgTagQr/qrcode'
import { htmlPrint } from '../../Constants'
import componentStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveBarCode, setImgTag } from '../../redux/actionCreators'

const Order = ({ item, idx, icon }) => {
  const dispatch = useDispatch()
  const activeBarCode = useSelector((state) => state.main.activeBarCode)
  const ImgTag = useSelector((state) => state.order.ImgTag)

  const html = useMemo(
    () => htmlPrint(item._id, item.name, ImgTag),
    [item, ImgTag]
  )

  useEffect(() => {
    imgCreate()
  }, [item])

  const imgCreate = () => {
    if (item._id) {
      const qr = qrcode(0, 'L')
      qr.addData(item._id)
      qr.make()
      const res = qr.createImgTag()
      dispatch(setImgTag(res))
    }
  }

  // const print = async () => {
  //   await Print.printAsync({
  //     html
  //   })
  // }

  return (
    <View
      style={{
        ...styles.orderContainer,
        width: 250,
        borderRightWidth: 0.5,
        borderRightColor: '#00000029'
      }}
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

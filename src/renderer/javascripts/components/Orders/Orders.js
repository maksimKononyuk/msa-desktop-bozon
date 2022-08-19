import React from 'react'
import { View, ActivityIndicator, Text } from 'react-native-web'
import Order from '../Order/Order'
import styles from '../../styles/Styles'
import componentStyles from './styles'
import { useSelector } from 'react-redux'
import arrowNotMain from '../../assets/icons/arrowNotMain.png'
import arrowMain from '../../assets/icons/arrowMain.png'
import { useHorizontalScroll } from '../../lib/useHorizontalScroll/useHorizontalScroll'

const Orders = () => {
  const scrollRef = useHorizontalScroll()
  const orders = useSelector((state) => state.main.orders)
  return (
    <View ref={scrollRef} style={[styles.shadow, { overflow: 'auto' }]}>
      <View style={{ flexDirection: 'row' }}>
        {orders.length ? (
          orders.map((item, idx) => {
            return (
              <Order
                item={item}
                key={idx}
                idx={idx}
                icon={idx === 0 ? arrowMain : arrowNotMain}
              />
            )
          })
        ) : (
          <View
            style={{
              ...styles.center,
              flex: 1,
              paddingTop: 15,
              backgroundColor: '#fff'
            }}
          >
            <ActivityIndicator size='large' color='#000088' />
            <Text style={{ ...componentStyles.searchingText, padding: 15 }}>
              Searching for available orders
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default Orders

import React, { useMemo } from 'react'
import { View, ActivityIndicator, Text } from 'react-native-web'
import Order from '../Order/Order'
import styles from '../../styles/Styles'
import componentStyles from './styles'
import { useSelector } from 'react-redux'
import { OrdersTranslate } from '../../Constants'
import arrowNotMain from '../../assets/icons/arrowNotMain.svg'
import arrowMain from '../../assets/icons/arrowMain.svg'
import { useHorizontalScroll } from '../../lib/useHorizontalScroll/useHorizontalScroll'

const Orders = () => {
  const scrollRef = useHorizontalScroll()
  const orders = useSelector((state) => state.main.orders)

  const language = useSelector((state) => state.main.language)
  const translate = useMemo(() => new OrdersTranslate(language), [language])

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
              {translate.getTitleLable()}
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default Orders

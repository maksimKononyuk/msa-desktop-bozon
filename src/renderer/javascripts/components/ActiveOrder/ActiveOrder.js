import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native-web'
import { JSONTree } from 'react-json-tree'
import componentStyles from './styles'

import styles from '../../styles/Styles'
import { jsonTreeTheme } from '../../Constants'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveBarCode } from '../../redux/actionCreators'

const ActiveOrder = () => {
  const dispatch = useDispatch()
  const orderStarted = useSelector((state) => state.main.orderStarted)
  const order = useSelector((state) => state.main.activeOrder)

  return (
    <View style={styles.container}>
      {orderStarted ? (
        <View
          style={{
            alignSelf: 'flex-start',
            paddingRight: 10,
            marginBottom: 15,
            flex: 1,
            overflow: 'auto'
          }}
        >
          <JSONTree
            data={order?.order?.list || {}}
            theme={{
              extend: jsonTreeTheme,
              nestedNodeLabel: ({ style }, nodeType, expanded) => ({
                style: {
                  ...style,
                  textTransform: expanded ? 'uppercase' : style.textTransform
                }
              })
            }}
            hideRoot={true}
            invertTheme={false}
            getItemString={() => <Text></Text>}
            labelRenderer={([label]) => (
              <Text style={componentStyles.labelText}>{label}:</Text>
            )}
            valueRenderer={(raw) => (
              <Text style={componentStyles.labelText}>{raw}</Text>
            )}
          />
        </View>
      ) : (
        <>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              width: 65,
              height: 65,
              borderRadius: 35,
              borderColor: 'red',
              borderWidth: 2,
              marginBottom: 25,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => {
              dispatch(setActiveBarCode(true))
            }}
          >
            <Text style={{ color: 'red', fontSize: 24 }}>i</Text>
          </TouchableOpacity>
          <Text style={componentStyles.mainText}>
            Complete order information will appear after clicking "START"
          </Text>
        </>
      )}
    </View>
  )
}

export default ActiveOrder

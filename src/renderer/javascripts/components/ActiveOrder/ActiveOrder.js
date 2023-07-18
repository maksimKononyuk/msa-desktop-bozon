import React, { useMemo } from 'react'
import { View, Text, TouchableOpacity } from 'react-native-web'
import { JSONTree } from 'react-json-tree'
import componentStyles from './styles'

import styles from '../../styles/Styles'
import { ActiveOrderTranslate, jsonTreeTheme } from '../../Constants'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveBarCode } from '../../redux/actionCreators'

const ActiveOrder = () => {
  const dispatch = useDispatch()
  const orderStarted = useSelector((state) => state.main.orderStarted)
  const order = useSelector((state) => state.main.activeOrder)
  const language = useSelector((state) => state.main.language)
  const translate = useMemo(
    () => new ActiveOrderTranslate(language),
    [language]
  )

  const valueRandererHandler = (raw) => {
    if (typeof raw === 'string') {
      const rawWithoutQuotes = raw.slice(1, -1)
      if (rawWithoutQuotes.startsWith('http')) {
        return (
          <Text
            onPress={() => {
              subscribeForEntries.openExternal(rawWithoutQuotes)
            }}
            style={[componentStyles.labelText, { color: 'blue' }]}
          >
            {raw}
          </Text>
        )
      }
      return <Text style={componentStyles.labelText}>{raw}</Text>
    }
  }

  return (
    <View style={styles.container}>
      {orderStarted ? (
        <View style={componentStyles.jsonTreeContainer}>
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
            valueRenderer={(raw) => valueRandererHandler(raw)}
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
            {translate.getInfoLable()}
          </Text>
        </>
      )}
    </View>
  )
}

export default ActiveOrder

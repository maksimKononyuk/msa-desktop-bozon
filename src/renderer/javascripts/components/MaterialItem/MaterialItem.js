import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native-web'
import { useDispatch, useSelector } from 'react-redux'
import {
  setMaterialsCondition,
  setMaterialsValue
} from '../../redux/actionCreators'
import styles from './styles'

const MaterialItem = ({ index }) => {
  const dispatch = useDispatch()
  const materials = useSelector((state) => state.main.materialsArr[index])
  const changeCondition = () => {
    dispatch(setMaterialsCondition(materials, index))
  }
  const changeValue = (inputValue) => {
    dispatch(setMaterialsValue(inputValue, materials, index))
  }

  const deleteAmountFromPathString = (str) => {
    if (str.includes('.amount')) {
      const result = str.replace('.amount', '')
      return result
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {deleteAmountFromPathString(materials.path)}
      </Text>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.sign}
        onPress={changeCondition}
      >
        <Text style={styles.signText}>
          {materials.condition == 'minus' ? '-' : '+'}
        </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        textAlign={'center'}
        value={materials.value.toString()}
        onChangeText={(text) => changeValue(text)}
      />
    </View>
  )
}

export default MaterialItem

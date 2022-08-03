import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Text, View, TouchableOpacity, Image } from 'react-native-web'
import styles from './styles'

const ImageCorousel = () => {
  const mapsArr = useSelector((state) => state.TechMaps.mapsArr)
  const [itemNumber, setItemNumber] = useState(0)

  const buttonHandler = (event) => {
    if (event.currentTarget.textContent === 'next')
      itemNumber < mapsArr.length - 1 && setItemNumber((prev) => ++prev)
    else itemNumber > 0 && setItemNumber((prev) => --prev)
  }

  return (
    <View style={styles.container}>
      <View style={styles.window}>
        <View
          style={[
            styles.images,
            { transform: [{ translateX: `${itemNumber * -100}%` }] }
          ]}
        >
          {mapsArr.map((item) => (
            <View style={styles.item} key={item.file_name}>
              <Text style={styles.itemText}>{item.file_name}</Text>
              <Image
                style={styles.itemImage}
                source={{ uri: item.file_url }}
                resizeMode={'contain'}
              />
            </View>
          ))}
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.button}
          onPress={buttonHandler}
        >
          <View style={[styles.upLineLeft, styles.line]}></View>
          <View style={[styles.downLineUpLeft, styles.line]}></View>
          <Text style={styles.textContent}>prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.button}
          onPress={buttonHandler}
        >
          <View style={[styles.upLineRight, styles.line]}></View>
          <View style={[styles.downLineUpRight, styles.line]}></View>
          <Text style={styles.textContent}>next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ImageCorousel

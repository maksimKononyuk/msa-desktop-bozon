import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native-web'

const ImageCorousel = () => {
  const mapsArr = useSelector((state) => state.TechMaps.mapsArr)
  const [itemNumber, setItemNumber] = useState(0)

  const buttonHandler = (event) => {
    if (event.currentTarget.textContent === 'next')
      itemNumber < mapsArr.length - 1 && setItemNumber((prev) => ++prev)
    else itemNumber > 0 && setItemNumber((prev) => --prev)
    console.log(event.currentTarget.value)
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
                style={{ height: '100%', width: '100%' }}
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  window: {
    height: '80%',
    width: '100%',
    overflow: 'hidden'
  },
  images: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    transitionDuration: '400ms'
  },
  item: {
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    width: 70,
    height: 50,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 1
  },
  line: {
    width: 20,
    height: 2,
    backgroundColor: '#fff'
  },
  upLineLeft: {
    transform: [{ rotate: '-45deg' }, { translateY: -8 }]
  },
  downLineUpLeft: {
    transform: [{ rotate: '45deg' }, { translateY: 8 }]
  },
  upLineRight: {
    transform: [{ rotate: '45deg' }, { translateY: -8 }]
  },
  downLineUpRight: {
    transform: [{ rotate: '-45deg' }, { translateY: 8 }]
  },
  textContent: {
    position: 'absolute',
    zIndex: -1
  }
})

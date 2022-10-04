import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Text, View, TouchableOpacity, Image, Modal } from 'react-native-web'
import styles from './styles'

const ImageCorousel = () => {
  const mapsArr = useSelector((state) => state.TechMaps.mapsArr)
  const [itemNumber, setItemNumber] = useState(0)

  const [modalVisible, setModalVisible] = useState(false)
  const [imgIndexForModal, setImgIndexForModal] = useState(0)

  const buttonHandler = (event) => {
    if (event.currentTarget.textContent === 'next')
      itemNumber < mapsArr.length - 1 && setItemNumber((prev) => ++prev)
    else itemNumber > 0 && setItemNumber((prev) => --prev)
  }

  const imageHandler = (index) => {
    setImgIndexForModal(index)
    setModalVisible(true)
  }

  const cancelHandler = () => {
    setModalVisible(false)
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
          {mapsArr.map((item, index) => (
            <TouchableOpacity
              style={styles.item}
              key={item.file_name}
              onPress={() => imageHandler(index)}
            >
              <Text style={styles.itemText}>{item.file_name}</Text>
              <Image
                style={styles.itemImage}
                source={{ uri: item.file_url }}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
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
      <Modal visible={modalVisible} transparent={false}>
        <View style={styles.modalContainer}>
          <Image
            style={[styles.itemImage, { width: '90%' }]}
            source={{ uri: mapsArr[imgIndexForModal].file_url }}
            resizeMode={'contain'}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={cancelHandler}
            style={styles.modalCancelBlock}
          >
            <View
              style={[
                styles.closeModalButtonLeftLine,
                styles.closeModalButtonLine
              ]}
            />
            <View
              style={[
                styles.closeModalButtonRightLine,
                styles.closeModalButtonLine
              ]}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

export default ImageCorousel

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Text, View, TouchableOpacity, Image, Modal } from 'react-native-web'
import styles from './styles'
import Obj3d from '../Obj3d/Obj3d'
import pdfIcon from '../../assets/icons/pdfFile.svg'
import objIcon from '../../assets/icons/objFile.svg'
import htmlIcon from '../../assets/icons/html.svg'

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
          {mapsArr.map((item, index) => {
            if (
              item.file_name.substr(item.file_name.lastIndexOf('.') + 1) ===
              'obj'
            )
              return (
                <TouchableOpacity
                  style={styles.item}
                  key={item.file_name}
                  onPress={() => imageHandler(index)}
                >
                  <Text style={styles.itemText}>{item.file_name}</Text>
                  <Image
                    source={objIcon}
                    resizeMode={'contain'}
                    style={{ width: '100%', height: '100%' }}
                  />
                </TouchableOpacity>
              )
            if (
              item.file_name.substr(item.file_name.lastIndexOf('.') + 1) ===
              'mp4'
            )
              return (
                <video
                  key={item.file_name}
                  width={'100%'}
                  height={'100%'}
                  controls={true}
                >
                  <source src={item.file_url} />
                </video>
              )
            if (
              item.file_name.substr(item.file_name.lastIndexOf('.') + 1) ===
              'pdf' || item.file_name.substr(item.file_name.lastIndexOf('.') + 1) === 'html'
            )
              return (
                <TouchableOpacity
                  style={styles.item}
                  key={item.file_name}
                  onPress={() =>
                    subscribeForEntries.openChildWindow(item.file_url)
                  }
                >
                  <Text style={styles.itemText}>{item.file_name}</Text>
                  <Image
                    style={styles.itemImage}
                    source={item.file_name.substr(item.file_name.lastIndexOf('.') + 1) ===
                    'pdf' ? pdfIcon : htmlIcon}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
              )
            else
              return (
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
              )
          })}
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
          {mapsArr[imgIndexForModal].file_name.substr(
            mapsArr[imgIndexForModal].file_name.lastIndexOf('.') + 1
          ) === 'obj' ? (
            <Obj3d url={mapsArr[imgIndexForModal].file_url} />
          ) : (
            <Image
              style={[styles.itemImage, { width: '90%' }]}
              source={{ uri: mapsArr[imgIndexForModal].file_url }}
              resizeMode={'contain'}
            />
          )}

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

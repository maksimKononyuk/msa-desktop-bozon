import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Text, View, TouchableOpacity, Image, Modal } from 'react-native-web'
import styles from './styles'
import Obj3d from '../Obj3d/Obj3d'
import pdfIcon from '../../assets/icons/pdfFile.svg'
import objIcon from '../../assets/icons/objFile.svg'
import htmlIcon from '../../assets/icons/html.svg'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import zoomInIcon from '../../assets/icons/zoomIn.svg'
import zoomOutIcon from '../../assets/icons/zoomOut.svg'
import ElementNotView from './ElementNotView'

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
                <ElementNotView
                  key={item.file_name}
                  handler={() => imageHandler(index)}
                  fileName={item.file_name}
                  icon={objIcon}
                />
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
              'pdf'
            )
              return (
                <ElementNotView
                  key={item.file_name}
                  handler={() =>
                    subscribeForEntries.openChildWindow(item.file_url)
                  }
                  fileName={item.file_name}
                  icon={pdfIcon}
                />
              )
            if (
              item.file_name.substr(item.file_name.lastIndexOf('.') + 1) ===
              'html'
            )
              return (
                <ElementNotView
                  key={item.file_name}
                  handler={() =>
                    subscribeForEntries.openChildWindow(item.file_url)
                  }
                  fileName={item.file_name}
                  icon={htmlIcon}
                />
              )
            else
              return (
                <ElementNotView
                  key={item.file_name}
                  fileName={item.file_name}
                  handler={() => imageHandler(index)}
                  icon={{ uri: item.file_url }}
                />
              )
          })}
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          activeOpacity={itemNumber > 0 ? 0.5 : 0}
          style={[styles.button, { opacity: itemNumber > 0 ? 100 : 0 }]}
          onPress={buttonHandler}
        >
          <View style={[styles.upLineLeft, styles.line]}></View>
          <View style={[styles.downLineUpLeft, styles.line]}></View>
          <Text style={styles.textContent}>prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={itemNumber < mapsArr.length - 1 ? 0.5 : 0}
          style={[
            styles.button,
            { opacity: itemNumber < mapsArr.length - 1 ? 100 : 0 }
          ]}
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
            <TransformWrapper>
              {({ zoomIn, zoomOut }) => (
                <View style={{ width: '95%' }}>
                  <TransformComponent>
                    <View style={{ width: '100%', cursor: 'pointer' }}>
                      <img
                        width={'100%'}
                        height={'100%'}
                        src={mapsArr[imgIndexForModal].file_url}
                      />
                    </View>
                  </TransformComponent>
                  <View style={styles.zoomButtonBlock}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={[styles.zoomButtonContainer, { marginRight: 10 }]}
                      onPress={() => zoomIn()}
                    >
                      <Image style={styles.zoomButtonImg} source={zoomInIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={styles.zoomButtonContainer}
                      onPress={() => zoomOut()}
                    >
                      <Image
                        style={styles.zoomButtonImg}
                        source={zoomOutIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </TransformWrapper>
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

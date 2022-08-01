import React from 'react'
import { View } from 'react-native-web'
import { carouselItems } from '../../Constants'

import MenuItem from '../MenuItem/MenuItem'
import styles from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveIndex } from '../../redux/actionCreators'

const CarouselComponent = () => {
  const dispatch = useDispatch()
  const orderStarted = useSelector((state) => state.main.orderStarted)

  return (
    <View style={styles.container}>
      {carouselItems.map((item, index) => (
        <MenuItem item={item} index={index} key={index} />
      ))}
      {/* <Carousel
        scrollEnabled={orderStarted}
        ref={carousel}
        firstItem={1}
        activeSlideOffset={0}
        swipeThreshold={0}
        callbackOffsetMargin={20}
        data={carouselItems}
        sliderWidth={windowWidth > 480 ? windowWidth * 0.75 : windowWidth}
        itemWidth={windowWidth > 480 ? windowWidth * 0.25 : windowWidth / 3}
        sliderHeight={60}
        itemHeight={60}
        renderItem={renderCarouselItem}
        onSnapToItem={(index) => dispatch(setActiveIndex(index))}
      /> */}
    </View>
  )
}

export default CarouselComponent

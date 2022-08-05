import React from 'react'
import { View } from 'react-native-web'
import { carouselItems } from '../../Constants'
import MenuItem from '../MenuItem/MenuItem'
import styles from './styles'

const CarouselComponent = () => {
  return (
    <View style={styles.container}>
      {carouselItems.map((item, index) => (
        <MenuItem item={item} index={index} key={index} />
      ))}
    </View>
  )
}

export default CarouselComponent

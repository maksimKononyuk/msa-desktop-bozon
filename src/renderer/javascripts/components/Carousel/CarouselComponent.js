import React from 'react'
import { View } from 'react-native-web'
import { getCouruselItems } from '../../Constants'
import MenuItem from '../MenuItem/MenuItem'
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles'

const CarouselComponent = () => {
  const language = useSelector((state) => state.main.language)
  return (
    <View style={styles.container}>
      {getCouruselItems(language).map((item) => (
        <MenuItem item={item} key={item.id} />
      ))}
    </View>
  )
}

export default CarouselComponent

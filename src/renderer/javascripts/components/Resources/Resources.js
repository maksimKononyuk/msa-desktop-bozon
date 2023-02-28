import React from 'react'
import { View, Text } from 'react-native-web'
import styles from './styles'

const testArr = [
  { title: 'Стальной лист', num1: 10, num2: 0 },
  { title: 'Упаковка', num1: 20, num2: 0 },
  { title: 'Анна Гукова', num1: 1, num2: 1 },
  { title: 'Антон Жуков', num1: 1, num2: 1 },
  { title: 'Готовая продукция', num1: 0, num2: 100 }
]

const Resources = () => {
  return (
    <View style={styles.container}>
      <View style={styles.itemBlock}>
        {testArr.map((elem) => (
          <View style={styles.item} key={elem.title}>
            <Text>{elem.title}</Text>
            <View style={styles.itemInnerBlock}>
              <View style={styles.itemNum}>
                <Text>{elem.num1}</Text>
              </View>
              <Text>→</Text>
              <View style={styles.itemNum}>
                <Text>{elem.num2}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default Resources

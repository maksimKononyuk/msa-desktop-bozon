import React from 'react'
import { Text, View, StyleSheet } from 'react-native-web'

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MSA</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 50
  }
})

export default App

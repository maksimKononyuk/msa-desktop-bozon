import React from 'react'
import { Text } from 'react-native-web'
import { useLocation } from 'react-router-dom'

const Main = () => {
  const { state } = useLocation()
  return <Text>MAIN User name - {state.userName}</Text>
}

export default Main

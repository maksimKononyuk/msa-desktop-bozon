import { StyleSheet } from 'react-native-web'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingHorizontal: '10%',
    paddingVertical: 15,
    justifyContent: 'space-between'
  },
  messagesBlock: {
    height: '85%',
    overflow: 'auto'
  },
  notMessageText: {
    fontFamily: 'Roboto',
    fontSize: 18,
    padding: 15
  }
})

export default styles

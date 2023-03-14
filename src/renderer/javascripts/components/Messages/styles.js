import { StyleSheet } from 'react-native-web'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingHorizontal: '10%',
    paddingVertical: 15,
    justifyContent: 'space-between'
  },
  loader: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    backgroundColor: '#fff',
    borderColor: '#138708',
    zIndex: 10,
    top: '50%',
    left: '50%',
    transform: [{ translateY: -50 }, { translateX: -50 }],
    alignItems: 'center',
    justifyContent: 'center'
  },
  loaderText: {
    fontSize: 26
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

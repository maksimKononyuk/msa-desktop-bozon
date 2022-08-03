import { StyleSheet } from 'react-native-web'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  window: {
    height: '80%',
    width: '100%',
    overflow: 'hidden'
  },
  images: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    transitionDuration: '400ms'
  },
  item: {
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  itemImage: {
    width: '100%',
    height: '100%'
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    width: 70,
    height: 50,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 1
  },
  line: {
    width: 20,
    height: 2,
    backgroundColor: '#fff'
  },
  upLineLeft: {
    transform: [{ rotate: '-45deg' }, { translateY: -8 }]
  },
  downLineUpLeft: {
    transform: [{ rotate: '45deg' }, { translateY: 8 }]
  },
  upLineRight: {
    transform: [{ rotate: '45deg' }, { translateY: -8 }]
  },
  downLineUpRight: {
    transform: [{ rotate: '-45deg' }, { translateY: 8 }]
  },
  textContent: {
    position: 'absolute',
    zIndex: -1
  }
})

export default styles

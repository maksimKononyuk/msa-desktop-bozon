import { StyleSheet } from 'react-native-web'

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginBottom: 5
  },
  image: {
    width: '100%',
    height: '100%'
  },
  fileContainer: {
    width: '50%',
    height: '50%',
    alignItems: 'center'
  },
  modalCancelBlock: {
    width: 40,
    height: 40,
    backgroundColor: '#808080',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeModalButtonLine: {
    width: 25,
    height: 2,
    backgroundColor: '#fff'
  },
  closeModalButtonLeftLine: {
    transform: [{ rotate: '45deg' }, { translateY: 1 }]
  },
  closeModalButtonRightLine: {
    transform: [{ rotate: '-45deg' }, { translateY: -1 }]
  }
})

export default styles

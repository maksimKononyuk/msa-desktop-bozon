import { StyleSheet } from 'react-native-web'

const styles = StyleSheet.create({
  pickerBlock: {
    width: 130,
    height: 130,
    marginRight: 15,
    marginBottom: 10
  },
  pickerContainer: {
    width: '100%',
    height: '100%'
  },
  activityIndicator: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  modalCancelBlock: {
    position: 'absolute',
    top: '2%',
    right: '3%',
    zIndex: 20,
    width: 40,
    height: 40,
    backgroundColor: '#000',
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

import { StyleSheet } from 'react-native-web'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    width: '25%',
    minWidth: 250,
    maxWidth: 300,
    justifyContent: 'space-between'
  },
  previousOperation: {
    paddingHorizontal: 25
  },
  previousOperationTitle: {
    color: '#8F8F8F'
  },
  previousOperationText: {
    color: '#fff',
    fontSize: 16
  },
  previousOperationTextContainer: {
    marginTop: 7,
    width: '100%',
    height: 55,
    backgroundColor: '#CF3B23',
    alignSelf: 'center',
    padding: 10
  },
  resultPreviousOperation: {
    marginTop: 20,
    paddingHorizontal: 15
  }
})
export default styles

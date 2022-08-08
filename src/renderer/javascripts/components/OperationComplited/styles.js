import { StyleSheet } from 'react-native-web'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000D9',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertContainer: {
    width: '65%',
    height: '50%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#707070',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  alertText: {
    fontSize: 30
  },
  alertButton: {
    width: 300,
    height: 80,
    backgroundColor: '#0080FF',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default styles

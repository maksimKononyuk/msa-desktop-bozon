import { StyleSheet } from 'react-native-web'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    paddingTop: 95
  },
  modalTitle: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: 30
  },
  buttonBlock: {
    marginTop: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 295,
    height: 70,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  redButton: {
    backgroundColor: '#CF3B23'
  },
  greenButton: {
    marginRight: 20,
    marginBottom: 0,
    backgroundColor: '#009C6D'
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Montserrat',
    fontSize: 20,
    marginLeft: 15
  },
  okButton: {
    width: 30,
    height: 30,
    marginTop: -10
  },
  noButton: {
    width: 20,
    height: 20
  }
})

export default styles

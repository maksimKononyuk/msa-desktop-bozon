import { StyleSheet } from 'react-native-web'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'space-between'
  },
  modalTitleBlock: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#bbb',
    borderBottomWidth: 0.5
  },
  modalTitle: {
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
    flexDirection: 'row',
    marginRight: 20,
    backgroundColor: '#009C6D'
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Montserrat',
    fontSize: 20,
    marginLeft: 15
  },
  versionText: {
    color: '#707070',
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    padding: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: '#bbb'
  }
})

export default styles

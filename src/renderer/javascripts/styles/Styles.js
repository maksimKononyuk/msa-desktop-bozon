import { StyleSheet } from 'react-native-web'

const styles = StyleSheet.create({
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    height: '100vh',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cameraContainer: {
    height: '114%'
  },
  authInput: {
    width: '100%',
    height: 43,
    fontFamily: 'Roboto',
    fontSize: 18,
    borderColor: '#B1B1B1',
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    marginTop: 50
  },
  authButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    marginTop: 50,
    height: 80
  },
  authText: {
    fontSize: 30,
    color: '#fff',
    fontFamily: 'Montserrat'
  },
  authError: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#E31E24',
    padding: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  authContainer: {
    width: 300,
    marginTop: -30,
    alignItems: 'center'
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    width: '100%',
    height: 42,
    padding: 10
  },
  headerName: {
    fontSize: 15,
    color: '#fff',
    marginLeft: 10,
    fontFamily: 'Roboto'
  },
  headerComplete: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: '#707070',
    marginRight: 10
  },
  orderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    width: 280,
    padding: 8,
    backgroundColor: '#fff'
  },
  printButton: {
    width: 76,
    height: 36,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '100%',
    padding: 20
  },
  operationContainer: {
    padding: 15,
    backgroundColor: '#fff',
    width: '100%',
    borderTopWidth: 3,
    borderTopColor: '#f2f2f2'
  },
  shadow: {
    width: '100%'
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 15
  },
  serverMessage: {
    margin: 10,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 7,
    borderTopLeftRadius: 0,
    width: '90%'
  },
  myMessage: {
    margin: 10,
    padding: 10,
    backgroundColor: '#0080FF',
    borderRadius: 7,
    borderTopRightRadius: 0,
    width: '90%',
    alignSelf: 'flex-end'
  },
  operationItem: {
    justifyContent: 'space-between',
    width: '90%',
    padding: 20,
    marginVertical: 10,
    borderRadius: 4
  },
  cancelContainer: {
    borderRadius: 50,
    borderColor: '#707070',
    borderWidth: 1,
    padding: 10,
    width: 150,
    marginTop: 20
  },
  barCodeResult: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  versionText: {
    color: '#707070',
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 'bold'
  }
})

export default styles

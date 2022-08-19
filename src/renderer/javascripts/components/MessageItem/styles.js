import { StyleSheet } from 'react-native-web'

const styles = StyleSheet.create({
  container: {
    width: '80%',
    borderRadius: 14,
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginBottom: 15
  },
  infoBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftPart: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 20,
    height: 20
  },
  text: {
    fontSize: 14,
    marginHorizontal: 5,
    fontFamily: 'Roboto',
    color: '#8F8F8F'
  },
  message: {
    marginLeft: 25,
    color: '#282A2D',
    fontSize: 18,
    fontFamily: 'Roboto'
  },
  operationText: {
    width: 100
  }
})

export default styles

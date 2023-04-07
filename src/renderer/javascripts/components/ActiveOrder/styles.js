import { StyleSheet } from 'react-native-web'

const styles = StyleSheet.create({
  jsonTreeContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    marginBottom: 15,
    flex: 1,
    overflow: 'auto'
  },
  labelText: {
    fontSize: 14,
    color: 'black',
    wordBreak: 'normal'
  },
  qrcodeIcon: {
    width: 60,
    height: 60,
    marginBottom: 20,
    marginTop: 20
  },
  mainText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#282A2D',
    textAlign: 'center',
    width: 250
  }
})

export default styles

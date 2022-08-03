import { StyleSheet } from 'react-native-web'
import { windowWidth } from '../../Constants'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 125
  },
  okCloseButtonsContainer: {
    flexDirection: 'row',
    flex: 1
  },
  buttonContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  okIcon: {
    width: 36,
    height: 36,
    marginBottom: 10
  },
  closeIcon: {
    width: 32,
    height: 32
  },
  titleText: {
    fontFamily: 'Montserrat',
    fontSize: 30,
    color: '#fff'
  }
})

export default styles

import { StyleSheet } from 'react-native-web'

const styles = StyleSheet.create({
  container: {
    paddingLeft: 25,
    paddingRight: 7,
    paddingVertical: 5,
    backgroundColor: '#F1F1F1',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },
  input: {
    width: '90%',
    padding: 5,
    outlineWidth: 0
  },
  sendButton: {
    width: 46,
    height: 46
  },
  sendButtonImage: {
    width: '100%',
    height: '100%'
  }
})

export default styles

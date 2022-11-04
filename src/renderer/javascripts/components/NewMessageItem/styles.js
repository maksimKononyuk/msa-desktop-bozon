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
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#95918C'
  },
  input: {
    width: '100%',
    padding: 5,
    outlineWidth: 0,
    fontFamily: 'Roboto',
    fontSize: 18
  },
  sendButton: {
    width: 46,
    height: 46
  },
  sendButtonImage: {
    width: '100%',
    height: '100%'
  },
  filePickerAndInputContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default styles

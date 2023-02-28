import { StyleSheet } from 'react-native-web'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 30
  },
  itemBlock: {
    width: '80%'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10
  },
  itemInnerBlock: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemNum: {
    width: 50
  }
})

export default styles

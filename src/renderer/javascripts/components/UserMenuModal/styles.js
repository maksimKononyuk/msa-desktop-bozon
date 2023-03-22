import { StyleSheet } from 'react-native-web'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    height: '100vh',
    paddingTop: 20,
    paddingBottom: 20
  },
  closeContainer: {
    width: '85%',
    alignItems: 'flex-end'
  },
  closeContainerButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeContainerButtonImage: {
    width: 30,
    height: 30
  },
  scrollViewStyle: {
    backgroundColor: '#000'
  },
  menuItemBlock: {
    width: '100%',
    alignItems: 'center'
  },
  menuItem: {
    width: '85%',
    height: 70,
    backgroundColor: '#242424',
    marginBottom: 15,
    justifyContent: 'center',
    paddingLeft: 20
  },
  menuItemText: {
    color: '#fff',
    fontFamily: 'Montserrat',
    fontSize: 18
  },
  input: {
    width: '85%',
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Roboto',
    outlineWidth: 0
  },
  closeIcon: {
    width: 20,
    height: 20,
    marginRight: 15
  },
  cancelText: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: '#6C6F72'
  },
  newOrderText: {
    fontSize: 24,
    marginBottom: 45
  },
  orderContainer: {
    width: '100%',
    alignItems: 'center',
    height: '90%'
  },
  orderNameText: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center'
  },
  scroll: {
    height: '80%',
    width: '100%',
    overflow: 'auto'
  },
  whatToDeliverContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 5
  },
  whatToDeliverText: {
    color: '#fff',
    fontSize: 14,
    width: '85%'
  },
  detailIdContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 5
  },
  detailIdText: {
    color: '#fff',
    fontSize: 14,
    width: '85%'
  },
  workplaceContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 5
  },
  workplaceText: {
    color: '#fff',
    fontSize: 14,
    width: '85%'
  },
  okButton: {
    width: 204,
    height: 70,
    backgroundColor: '#0080FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  okButtonText: {
    color: '#fff',
    fontSize: 24
  },
  getSetButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  storageBlock: {
    width: '100%',
    height: 400,
    backgroundColor: '#fff',
    marginTop: 10
  },
  versionContainer: {
    width: '85%'
  },
  aboutPlatformModal: {
    height: '100%',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  aboutPlatformContainer: {
    width: 700,
    height: 420,
    backgroundColor: '#fff',
    paddingHorizontal: 67,
    paddingVertical: 37,
    justifyContent: 'space-between'
  },
  closeBlockAboutPlatform: {
    position: 'absolute',
    top: 14,
    right: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeBlockAboutPlatformLines: {
    width: '80%',
    borderColor: '#525252',
    borderWidth: 1
  },
  closeBlockAboutPlatformLine1: {
    transform: [{ rotate: '45deg' }, { translateY: 1.5 }]
  },
  closeBlockAboutPlatformLine2: {
    transform: [{ rotate: '-45deg' }, { translateY: -1 }]
  },
  aboutPlatformTitleText: {
    fontFamily: 'Roboto',
    fontSize: 40,
    color: '#000000'
  },
  aboutPlatformRightsText: {
    marginTop: 20,
    fontFamily: 'Roboto',
    color: '#525252',
    fontSize: 20
  },
  aboutPlatformContentText: {
    fontFamily: 'Roboto',
    fontSize: 24,
    color: '#000'
  }
})

export default styles

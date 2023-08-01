import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native-web'

import styles from '../../styles/Styles'
import componentStyles from './styles'
import { setIsUserMenuModal } from '../../redux/actionCreators'
import UsersMenuModal from '../UserMenuModal/UserMenuModal'
import { useDispatch, useSelector } from 'react-redux'
import personIcon from '../../assets/images/person.png'
import menuButton from '../../assets/icons/headerButton.jpg'

const Header = ({ logOut, userName }) => {
  const dispatch = useDispatch()
  const isUserMenuModal = useSelector((state) => state.header.isUserMenuModal)

  return (
    <View style={styles.headerContainer}>
      <View style={styles.center}>
        <Image style={componentStyles.personIcon} source={personIcon} />
        <Text style={styles.headerName}>{userName}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={componentStyles.headerButton}
        onPress={() => dispatch(setIsUserMenuModal(true))}
      >
        <Image source={menuButton} style={{width: '100%', height: '100%'}}/>
        {/* <View style={componentStyles.buttonsBlock}>
          <View style={componentStyles.headerButtonLine}></View>
          <View style={componentStyles.headerButtonLine}></View>
        </View> */}
      </TouchableOpacity>
      {isUserMenuModal && <UsersMenuModal logOut={logOut} />}
    </View>
  )
}

export default Header

import { TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAppDispatch } from '../../hooks';
import { logOut } from '../../redux/user-data/user-data';

const LogOutButton = () => {
  const dispatch = useAppDispatch();

  const handleLogoutPress = () => {
    dispatch(logOut());
    AsyncStorage.clear();
  };

  return (
    <TouchableOpacity onPress={handleLogoutPress}>
      <Image source={require('../../images/log-out.png')} />
    </TouchableOpacity>
  );
};

export default LogOutButton;

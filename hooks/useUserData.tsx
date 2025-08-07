import { View, Text } from 'react-native'
import React from 'react'
import SecureStore from 'expo-secure-store';

const useUserData = () => {

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [avatar, setAvatar] = React.useState('');

  React.useEffect(() => {
    const getUserSession = async () => {
      const name = await SecureStore.getItemAsync("name");
      const email = await SecureStore.getItemAsync("email");
      const avatar = await SecureStore.getItemAsync("avatar");

      if (name) setName(name!);
      if (email) setEmail(email!);
      if (avatar) setAvatar(avatar!);
    }
    getUserSession();
  }, []);

return {
    name,
    email,
    avatar
  }
}
export default useUserData
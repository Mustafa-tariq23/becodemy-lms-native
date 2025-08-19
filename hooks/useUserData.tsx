import { View, Text } from 'react-native'
import React from 'react'
import SecureStore from 'expo-secure-store';
import { useAuth } from '@/context/auth.context';

const useUserData = () => {
  const { user: authUser, isAnonymous } = useAuth();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [avatar, setAvatar] = React.useState('');

  React.useEffect(() => {
    const getUserSession = async () => {
      // Prioritize Firebase auth user data
      if (authUser) {
        setName(authUser.displayName || authUser.email?.split('@')[0] || (isAnonymous ? 'Guest User' : 'User'));
        setEmail(authUser.email || (isAnonymous ? 'guest@example.com' : ''));
        setAvatar(authUser.photoURL || '');
        return;
      }

      // Fallback to SecureStore for legacy users
      const name = await SecureStore.getItemAsync("name");
      const email = await SecureStore.getItemAsync("email");
      const avatar = await SecureStore.getItemAsync("avatar");

      if (name) setName(name!);
      if (email) setEmail(email!);
      if (avatar) setAvatar(avatar!);
    }
    getUserSession();
  }, [authUser, isAnonymous]);

return {
    name,
    email,
    avatar
  }
}
export default useUserData
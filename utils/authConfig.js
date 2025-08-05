import * as AuthSession from 'expo-auth-session';

// This utility helps you get the redirect URI for OAuth configuration
export const getRedirectUri = () => {
  const redirectUri = AuthSession.makeRedirectUri({
    scheme: 'lms'
  });
  console.log('=== OAuth Configuration ===');
  console.log('Redirect URI for Google Cloud Console:', redirectUri);
  console.log('Add this URL to your Google OAuth app\'s authorized redirect URIs');
  console.log('===============================');
  return redirectUri;
};

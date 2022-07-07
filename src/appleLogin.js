/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const onAppleButtonPress = async () => {
  // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw 'Apple Sign-In failed - no identify token returned';
  }

  // Create a Firebase credential from the response
  const {identityToken, nonce} = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce,
  );

  // Sign the user in with the credential
  return auth().signInWithCredential(appleCredential);
};

const AppleSignIn = () => {
  const navigation = useNavigation(); //이거 있어야 부모 컴포넌트한테 navigation 할 수 있댔음

  return (
    <View style={{alignItems: 'center'}}>
      <AppleButton
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.CONTINUE}
        onPress={() =>
          onAppleButtonPress().then(() =>
            // console.log('Apple sign-in complete!')
            navigation.reset({
              routes: [
                {
                  name: 'Home',
                },
              ],
            }),
          )
        }
        style={{width: 300, height: 40}}
      />
    </View>
  );
};

export default AppleSignIn;

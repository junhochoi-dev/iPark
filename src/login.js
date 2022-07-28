import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal,} from 'react-native';
import SnsGoogleLogin from './GoogleLogin';
import AppleSignIn from './appleLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { Linking } from 'react-native';
const LoginScreen = ({navigation}) => {
  /*
  const [userEmail, setUserEmail] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  // const [userPhotoURL, setUserPhotoURL] = useState(null);

  //const [loading, setLoading] = useState(false);
  //const [error, setError] = useState('');
  */
  useEffect(() => {
    logincheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logincheck() {
    AsyncStorage.getItem('isLogin').then(result => {
      if (result === 'true') {
        navigation.reset({
          routes: [
            {
              name: 'Home',
              /*, params: {
              email: userEmail,
              photo: userPhoto,
              photoURL: userPhotoURL
              }*/
            },
          ],
        });
      }
    });
  }
  return (
    <View style={styles.mainView}>
      <Text style={styles.title}>IPARK QRCheckIn</Text>
      <Text style={styles.text}>교내 이메일로 로그인해주세요</Text>
      <Text style={styles.text}>Please sign in using korea univ email</Text>
      <View style={styles.buttonContainer}>
        <AppleSignIn />
        <SnsGoogleLogin /> 
        <Text style={{color:'white' , fontSize:10}}  onPress={()=>Linking.openURL("https://kuipark.blogspot.com/2021/07/ipark-ipakradmin-30.html")}>개인정보처리방침</Text>       

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#A33B39',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#e8e8e8',
    fontSize: 20,
    width: '80%',
    marginVertical: 8,
    padding: 15,
    color: '#A33B39',
    borderRadius: 8,
  },
  buttonContainer: {
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    margin: 30,
    alignItems:'center'
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 50,
    marginHorizontal: 100,
  },
  btntext: {
    color: '#A33B39',
  },
  LoginButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: 300,
    height: 40,
  },
});

export default LoginScreen;

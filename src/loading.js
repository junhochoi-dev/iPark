import React, {componentDidMount, useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import SplashScreen from 'react-native-splash-screen';

const LoadingScreen = ({navigation}) => {

    useEffect(() => {
        /*setTimeout(() => {
            SplashScreen.hide();
        }, 1000);*/
        logincheck();
      }, []);
      
      function logincheck(){
        AsyncStorage.getItem('isLogin').then((result)=>{
          if(result === 'true') {
            navigation.reset({routes: [{name: "Home" }]})
          }
          else {
            navigation.reset({routes: [{name: "Login" }]})
          }
        })
      }
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size= "large" color= "red" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})

export default LoadingScreen;
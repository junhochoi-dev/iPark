import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { Linking } from 'react-native';
const infoUser = ({navigation, route}) => {
  const userInfo = route.params;
  console.log(userInfo)

  return (
    <View style={{flex: 1,}}>
        <View style={styles.mainContainer}>
            <View style={{justifyContent: 'center', alignSelf: 'center'}}>
                <Image
                  style={{width: 250, height: 250, borderRadius: 10,}}
                  source={{uri: userInfo.image}}
                />
            </View>
            <View style={{alignSelf: 'center', backgroundColor: 'white', marginTop: 20, width: '90%', height: 300, borderRadius: 10, padding: 20}}>
                <View style={{flexDirection: 'row', marginVertical: 10}}>
                    <Text style={{flex: 1,fontWeight: 'bold'}}>이름</Text>
                    <Text style={{flex: 2, alignItems: 'flex-end'}}>{userInfo.name}</Text>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 10,}}>
                    <Text style={{flex: 1,fontWeight: 'bold'}}>학번</Text>
                    <Text style={{flex: 2, alignItems: 'flex-end'}}>{userInfo.student_num}</Text>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 10,}}>
                    <Text style={{flex: 1,fontWeight: 'bold'}}>학과</Text>
                    <Text style={{flex: 2, alignItems: 'flex-end'}}>{userInfo.major}</Text>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 10,}}>
                    <Text style={{flex: 1,fontWeight: 'bold'}}>연락처</Text>
                    <Text style={{flex: 2, alignItems: 'flex-end'}}>{userInfo.phone_num}</Text>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 10,}}>
                    <Text style={{flex: 1,fontWeight: 'bold'}}>이메일</Text>
                    <Text style={{flex: 2, alignItems: 'flex-end'}}>{userInfo.email}</Text>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 10,}}>
                    <Text style={{flex: 1,fontWeight: 'bold'}}>이용권</Text>
                    <Text style={{flex: 2, alignItems: 'flex-end'}}>{userInfo.reserve_product}</Text>
                </View>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: 'pink',
        margin: 20,
        borderRadius: 10,
        alignContent: 'center',
        justifyContent: 'center',

        backgroundColor: '#A33B39',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default infoUser;

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { Linking } from 'react-native';
const infoIpark = ({navigation}) => {

  return (
    <View style={{flex: 1, justifyContent: 'center',}}>
        <Image
          style={{margin: 10, height: 200, borderRadius: 10}}
          source={{uri: 'https://mblogthumb-phinf.pstatic.net/MjAxOTAxMjhfMjcy/MDAxNTQ4NjUzODQwNDU1.TGZerrlJmY3RSyDS6Tn2N6CIHqgiwLpgKDBNKy_iaQEg.UdaBm47Y13IfcqTEkkoMcJtJXnf3rKypl23jPqit9akg.JPEG.ks_enter/20190111_145645.jpg?type=w2'}}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL('https://sejong.korea.ac.kr/mbshome/mbs/kr/subview.do?id=kr_050705010000',)}>
          <Text style={styles.text}>이용안내</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL('https://sejong.korea.ac.kr/mbshome/mbs/kr/subview.do?id=kr_050705020000',)}>
          <Text style={styles.text}>이용요금</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL('https://sejong.korea.ac.kr/mbshome/mbs/kr/subview.do?id=kr_050705030000',)}>
          <Text style={styles.text}>시설안내</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL('https://sejong.korea.ac.kr/mbshome/mbs/kr/subview.do?id=kr_050705040000',)}>
          <Text style={styles.text}>환불규정</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL('https://sejong.korea.ac.kr/mbshome/mbs/kr/subview.do?id=kr_050705060000',)}>
          <Text style={styles.text}>센터소개</Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  text:{
    color: 'white',
    fontSize: 15,
  },
  button: {
    margin: 10,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
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

export default infoIpark;

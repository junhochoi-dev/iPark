import React from 'react';
//import QRCode from 'react-native-qrcode-generator';
import QRCode from 'react-native-qrcode-svg';
import {StyleSheet, View, Text, Image} from 'react-native';

const QRCodeGenerator = ({route}) => {
  const userInfo = route.params;
  console.log(userInfo)
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', marginBottom: 20, padding: 30, borderRadius: 10, elevation: 6,}}>
        <View style={{ marginRight: 10 }}>
            <Image style={{ width: 120, height: 120, borderRadius: 10}} source={{ uri: userInfo.image }} />
        </View>
        <View style={{ marginLeft: 10,}}>
            <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 10}}>{userInfo.name}</Text>
            <Text>{userInfo.student_num}</Text>
            <Text>{userInfo.major}</Text>
            <Text>{userInfo.email}</Text>
            <Text>{userInfo.reserve_product}</Text>
        </View>
      </View>


      {/* <Image style={{width: 30, height: 30}} source={{uri: userInfo.photo}} /> */}

      <QRCode
        value={JSON.stringify(userInfo)}
        size={300}
        bgColor="black"
        fgColor="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
    color: 'black',
  },
});

export default QRCodeGenerator;

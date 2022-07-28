import React from 'react';
//import QRCode from 'react-native-qrcode-generator';
import QRCode from 'react-native-qrcode-svg';
import {StyleSheet, View, Text, Image} from 'react-native';

const QRCodeGenerator = ({route}) => {
  const userInfo = route.params;
  console.log(userInfo)
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', marginBottom: 20, padding: 10, borderRadius: 10, elevation: 6, backgroundColor: 'white'}}>
        <View>
            <Image style={{ width: 150, height: 150, borderRadius: 10}} source={{ uri: userInfo.image }} />
        </View>
        <View style={{ marginLeft: 20, width: 150}}>
            <View style={{flexDirection: 'row', marginVertical: 10}}>
                <Text style={{flex: 1,fontWeight: 'bold'}}>이름</Text>
                <Text style={{flex: 2, alignItems: 'flex-end'}}>{userInfo.name}</Text>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 10,}}>
                <Text style={{flex: 1,fontWeight: 'bold'}}>학번</Text>
                <Text style={{flex: 2, alignItems: 'flex-end'}}>{userInfo.student_num}</Text>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 10,}}>
                <Text style={{flex: 1,fontWeight: 'bold'}}>연락처</Text>
                <Text style={{flex: 2, alignItems: 'flex-end'}}>{userInfo.phone_num}</Text>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 10,}}>
                <Text style={{flex: 1,fontWeight: 'bold'}}>이용권</Text>
                <Text style={{flex: 2, alignItems: 'flex-end'}}>{userInfo.reserve_product}</Text>
            </View>

        </View>
      </View>

      <QRCode
        value={JSON.stringify(userInfo)}
        size={350}
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

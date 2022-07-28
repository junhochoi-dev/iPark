/* eslint-disable react-native/no-inline-styles */
import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Pressable,
  Alert,
  Image
} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const API_URL = 'https://cxz3619.pythonanywhere.com/';

/* item list 바꿔주는 함수 */
maxlength_t=15
maxlength_p=120
const Item = ({ item, onPress, style, index}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Image style={{width:70,height:70}} source={{uri:item.image}} />
    <View style={{flex:3, marginLeft: 10}}>
        <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>{item.title.length>=maxlength_t?item.title.substring(0,maxlength_t)+"...":item.title}</Text>
        </View>

        <Text style={styles.paragraph}>{item.paragraph.length>=maxlength_p?item.paragraph.substring(0,maxlength_p)+"...":item.paragraph}</Text>
    </View>
  </TouchableOpacity>
);

const NoticeBoard = ({ navigation }) => {

  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    try {
      fetch(API_URL + 'notice/')
        .then(response => response.json())
        .then(data => {
          data.reverse()
          setData(data)
        });
    } catch (e) {
      throw e;
    }

  }, []);

  const renderItem = ({ item }) => {
    //id가 selectedId라면 배경색상 변경
    const backgroundColor = item.id === selectedId ? '#DDDDDD' : '#FFFFFF';

    return (
      <View>
        <Item
          item={item}
          //아이템을 클릭하면 selectedId가 변경
          onPress={() => {
            setSelectedId(item.id);
            navigation.navigate('NoticeView', { id: item.id, title: item.title, paragraph: item.paragraph, image: item.image })
          }}
          style={{
            height: 150,
            borderRadius: 10,
            borderColor: 'white',
            backgroundColor: 'white',
            justifyContent: 'center',
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        //리스트의 소스를 담는 속성
        data={data}
        //data로 받은 소스의 아이템들을 render 시켜주는 콜백함수
        renderItem={renderItem}
        //item의 고유의 키를 부여하는 속성
        keyExtractor={item => item.id}
        //selectedId가 변경되면 리렌더링 되도록 하는 속성
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

/**
 *  StyleSheet
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection:"row",
  },
  title: {
    fontWeight:"bold",
    fontSize: 17,
    marginBottom: 10,
  },
  paragraph:{
    fontSize:11,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

/**https://daesiker.tistory.com/30 */
export default NoticeBoard;

/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Modal,
  Linking,
} from 'react-native';
//import {baseProps} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import {GoogleSignin} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Chart from './chart';
import ProgressCircle from 'react-native-progress-circle';

const HomeScreen = ({route, navigation}) => {
  const API_URL = 'https://cxz3619.pythonanywhere.com/liveData/';

  //const userInfo = route.params; //개인정보
  const [users, setUsers] = useState([]); //현재 몇명있는지 정보
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users_member, setUsers_member] = useState([]);
  const [Email, setEmail] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  let email_modify;
  var year = new Date().getFullYear(); // 년
  var month = new Date().getMonth() + 1; // 월
  var date = new Date().getDate(); // 일
  var Day = new Date().getDay(); // 요일 월 화 수 목 금 토 일 0 1 2 3 4 5 6
  // 이번 달 1일 요일
  var tmpDate = date;
  var tmpDay = Day;
  var thirdWeekMonday, fourthWeekFriday;
  tmpDate % 7 == 0 ? (tmpDate = 7) : (tmpDate %= 7);
  tmpDay = (7 + tmpDay - (tmpDate - 1)) % 7;
  // 이번 달 셋째주 월요일
  if (tmpDay > 1) {
    // 화수모금토
    thirdWeekMonday = 1 + 14 - (tmpDay - 1);
  } else if (tmpDay == 0) {
    // 일
    thirdWeekMonday = 1 + 14 + 1;
  } else {
    // 월
    thirdWeekMonday = 1 + 14;
  }
  // 이번 달 넷째주 금요일
  fourthWeekFriday = thirdWeekMonday + 11;
  // 다음 달 말일
  var lastDate = new Date(year, month + 1, 0).getDate();

  AsyncStorage.getItem('Email').then(Email => {
    setEmail(Email);
  });
  AsyncStorage.getItem('Photo').then(Photo => {
    setUserPhoto(Photo);
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    try {
      if (thirdWeekMonday <= date && fourthWeekFriday >= date) {
        setModalVisible(true);
      }
      fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          setUsers(data);
          setLoading(false);
          AsyncStorage.setItem('isLogin', 'true');
        });
    } catch (e) {
      setError(e);
      throw e;
    }

    AsyncStorage.getItem('Email').then(Email => {
      try {
        console.log(Email);
        if (Email.indexOf('korea.ac.kr') != -1) {
          email_modify = Email.replace('.ac.kr', '');
        }
        if (Email.indexOf('.com') != -1) {
          email_modify = Email.replace('.com', '');
        }
        console.log('change email : ', email_modify);
        console.log(
          'https://cxz3619.pythonanywhere.com/memberData/' + email_modify,
        );

        fetch('https://cxz3619.pythonanywhere.com/memberData/' + email_modify)
          .then(response => response.json())
          .then(data => {
            setUsers_member(data);
            console.log(data);
            console.log(users_member);
          })
          .catch(error => console.log('error : ', error));
      } catch (e) {
        setError(e);
        console.log('error 2 : ', error);
        throw e;
      }
    });
  }, [error]);

  async function signOut() {
    //로그아웃
    try {
      AsyncStorage.setItem('isLogin', 'false');
      navigation.reset({routes: [{name: 'Login'}]});
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (e) {
      Alert.alert('Something else went wrong... ', e.toString());
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator />
      </SafeAreaView>
    );
    //REST API
  } else {
    let count = users.length;
    console.log(count);
    return (
      <SafeAreaView style={styles.mainContainer}>
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.registerAlert}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
                {(month % 12) + 1}月 IPark 등록기간 일정 안내{'\n'}
              </Text>
              <Text style={{fontWeight: 'bold'}}>■ 온라인 접수 기간</Text>
              <Text>
                {year}년 {month}월 {thirdWeekMonday}일 ~ {year}년 {month}월{' '}
                {fourthWeekFriday}일
              </Text>
              <Text>(전월 셋째주 월요일 ~ 넷째주 금요일){'\n'}</Text>

              <Text style={{fontWeight: 'bold'}}>■ 현장 접수 기간</Text>
              <Text>
                {month + 1 == 13 ? year + 1 : year}년 {(month % 12) + 1}월 1일 ~{' '}
                {month + 1 == 13 ? year + 1 : year}년 {(month % 12) + 1}월{' '}
                {lastDate}일
              </Text>
              <Text>(당월 1일 ~ 당월 말일){'\n'}</Text>

              <TouchableOpacity
                style={{
                  backgroundColor: '#A33B39',
                  marginBottom: 20,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.text}>☑ 위 내용을 확인했습니다</Text>
              </TouchableOpacity>

              <Text style={{fontWeight: 'bold'}}>■ 참고 링크</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.registerButton}
                  onPress={() =>
                    Linking.openURL(
                      'https://sejong.korea.ac.kr/mbshome/mbs/kr/subview.do?id=kr_050705010000',
                    )
                  }>
                  <Text style={styles.text}>이용안내</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.registerButton}
                  onPress={() =>
                    Linking.openURL(
                      'https://sejong.korea.ac.kr/mbshome/mbs/kr/subview.do?id=kr_050705020000',
                    )
                  }>
                  <Text style={styles.text}>이용요금</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.registerButton}
                  onPress={() =>
                    Linking.openURL(
                      'https://sejong.korea.ac.kr/mbshome/mbs/kr/subview.do?id=kr_050705040000',
                    )
                  }>
                  <Text style={styles.text}>환불규정</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <ScrollView
          contentContainerStyle={styles.mainContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{flexDirection: 'row', position: 'relative', flex: 1}}>
            <View style={styles.container}>
              <View style={styles.radiusbar}>
                <Text style={{color: 'white'}}>수용 인원</Text>
              </View>
              <View>
                {count < 20 ? (
                  <ProgressCircle
                    percent={(users.length / 50) * 100}
                    radius={50}
                    borderWidth={8}
                    color="#58FA58"
                    shadowColor="#999"
                    bgColor="#fff">
                    <Text style={{fontSize: 18}}>{users.length}</Text>
                  </ProgressCircle>
                ) : count < 40 ? (
                  <ProgressCircle
                    percent={(users.length / 50) * 100}
                    radius={50}
                    borderWidth={8}
                    color="#FFBF00"
                    shadowColor="#999"
                    bgColor="#fff">
                    <Text style={{fontSize: 18}}>{users.length}</Text>
                  </ProgressCircle>
                ) : (
                  <ProgressCircle
                    percent={(users.length / 50) * 100}
                    radius={50}
                    borderWidth={8}
                    color="#A33B39"
                    shadowColor="#999"
                    bgColor="#fff">
                    <Text style={{fontSize: 18}}>{users.length}</Text>
                  </ProgressCircle>
                )}
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.questionButton}
                  onPress={() =>
                    Alert.alert(
                      '센터 이용 안내',
                      '센터 사용 인원이 50명을 초과하면, 센터 이용에 불편함이 있을 수 있습니다. 이용하시기 전, 참고바랍니다.',
                      [
                        {
                          text: '☑ 위 내용을 확인했습니다',
                          onPress: () => console.log('OK Pressed'),
                        },
                      ],
                    )
                  }>
                  <Text style={styles.text}>?</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.container}>
              <View style={styles.radiusbar}>
                <Text style={{color: 'white'}}>유저 프로필</Text>
              </View>
              <Image
                style={{width: 100, height: 100, borderRadius: 10}}
                source={{uri: users_member.image}}
                // source={require('./assets/images/checked.png')}
              />
            </View>
          </View>

          <View style={{flex: 1.5}}>
            <View style={styles.container}>
              <View style={styles.radiusbar}>
                <Text style={{color: 'white'}}>이용시간 분포</Text>
              </View>
              <Chart />
            </View>
            <View style={{marginRight: 10, alignItems: 'flex-end'}}>
              <Text style={{fontWeight: 'bold', color: '#A33B39'}}>
                * '한 달 전~오늘'까지의 시간대별 평균 이용 인원수 입니다.
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={() =>
                //navigation.reset({routes: [{name: 'QRGenerate'}]})
                navigation.navigate('QRGenerate', {
                  email: Email,
                  photo: userPhoto,
                  name: users_member.name,
                  image: users_member.image,
                  major: users_member.major,
                  student_num: users_member.student_num,
                  reserve_product: users_member.reserve_product,
                })
              }>
              <Text style={styles.text}>QR Code</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={() =>
                signOut() ? Alert.alert('Logout success') : Alert.alert('error')
              }>
              <Text style={styles.text}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              color="black"
              title="notice"
              onPress={() => navigation.navigate('NoticeBoard')}>
              <Text style={styles.text}>아이파크 공지</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer} />
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: '#A33B39',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 5,
  },
  questionButton: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: -10,
    bottom: -10,
    backgroundColor: '#A33B39',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  text: {
    color: 'white',
  },
  radiusbar: {
    width: 120,
    height: 30,
    backgroundColor: '#A33B39',
    borderBottomWidth: 0.5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    marginBottom: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: StatusBar.currentHeight,
    paddingTop: 5,
    //height: 1000,
  },
  buttonContainer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  footer: {
    height: 55,
    backgroundColor: '#A33B39',
    // marginTop: 20,
  },
  registerAlert: {
    width: '90%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  registerButton: {
    width: 100,
    height: 40,
    backgroundColor: '#A33B39',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    flex: 1,
    margin: 5,
  },
});

export default HomeScreen;

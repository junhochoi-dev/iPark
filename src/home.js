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
import ProgressCircle from 'react-native-progress-circle';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome';

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

  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);

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

  AsyncStorage.getItem('Email').then(Email => { setEmail(Email); });
  AsyncStorage.getItem('Photo').then(Photo => { setUserPhoto(Photo); });

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
          AsyncStorage.setItem('isLogin', 'true');
        });
    } catch (e) { setError(e); throw e; }

    try {
      fetch('https://cxz3619.pythonanywhere.com/notice/')
        .then(response => response.json())
        .then(data => {
          data.reverse()
          setData(data)
          console.log(data[0])
          console.log(data[1])
          setLoading(false);
        });
    } catch (e) { setError(e); throw e; console.log('ERROR#########')}

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
        console.log('https://cxz3619.pythonanywhere.com/memberData/' + email_modify,);

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
    let memberInIpark = users.length
    return (
      <SafeAreaView style={styles.container}>
            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.registerAlert}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
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
                    </View>
                </View>
            </Modal>

            <View style={styles.topContainer}>
                <View style={{marginHorizontal: 10, marginTop: 10, flexDirection: 'row'}}>
                    <Text style={{flex: 1, fontSize: 25, fontWeight: 'bold', color: 'white'}}>IPARK</Text>
                    {users_member.reserve_product == '관리자' || users_member.reserve_product == '근로장학생' ?
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                        <TouchableOpacity style={{ flexDirection: 'row',
                        backgroundColor: 'red', borderRadius: 10, width: 120, height: 30, justifyContent: 'center', alignItems: 'center',}}
                          onPress={() => navigation.navigate('admin')}>
                          <Icon name="gear" size={14} color="#ffffff" />
                          <Text style={{color: '#ffffff', fontWeight: 'bold'}}> QR CheckIn</Text>
                        </TouchableOpacity>
                    </View>
                    : null}
                </View>
                <View style={styles.profileContainer}>
                    <View style={{flexDirection: 'row', marginHorizontal: 10,}}>
                        <View style={styles.topContainerFirst}>
                            <View style={styles.profile}>
                                <Image
                                  style={{width: 100, height: 100, borderRadius: 10}}
                                  source={{uri: users_member.image}}
                                />
                            </View>
                        </View>
                        <View style={styles.topContainerSecond}>
                            <Text> 이름 : {users_member.name}</Text>
                            <Text> 학번 : {users_member.student_num}</Text>
                            <Text> 학과 : {users_member.major}</Text>
                            <Text> 연락처 : {users_member.phone_num}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text> 이용권 : </Text>
                                {users_member.reserve_product != "" ?
                                    <Text style={{backgroundColor:'green', borderRadius: 10, color: 'white'}}>  {users_member.reserve_product}  </Text>
                                    : <Text></Text>}
                                <Text> </Text>
                                {users_member.day_pass == true ?
                                    <Text style={{backgroundColor:'red', borderRadius: 10}}>  1일권  </Text>
                                    : <Text></Text>}
                            </View>
                        </View>
                    </View>
                </View>

            <View style={{flexDirection: 'row', justifyContent: 'center', marginHorizontal: 5,}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={styles.menuButton}
                        onPress={() => navigation.navigate('NoticeBoard')}>
                        <View style={styles.iconContainer}><Icon name="lightbulb-o" size={30} color="#ffffff" /></View>
                        <Text style={styles.iconText}>공지사항</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={styles.menuButton}
                        onPress={() =>
                            navigation.navigate('QRGenerate', {
                              email: Email,
                              photo: userPhoto,
                              name: users_member.name,
                              image: users_member.image,
                              major: users_member.major,
                              phone_num: users_member.phone_num,
                              student_num: users_member.student_num,
                              reserve_product: users_member.reserve_product,
                            })}>
                        <View style={styles.iconContainer}><Icon name="qrcode" size={30} color="#ffffff" /></View>
                        <Text style={styles.iconText}>QR출입</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={styles.menuButton}
                        onPress={() =>
                            navigation.navigate('infoUser', {
                              email: Email,
                              photo: userPhoto,
                              name: users_member.name,
                              phone_num: users_member.phone_num,
                              image: users_member.image,
                              major: users_member.major,
                              student_num: users_member.student_num,
                              reserve_product: users_member.reserve_product,
                            })}>
                        <View style={styles.iconContainer}><Icon name="child" size={30} color="#ffffff" /></View>
                        <Text style={styles.iconText}>내정보</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={styles.menuButton}
                        onPress={() => signOut()}>
                        <View style={styles.iconContainer}><Icon name="sign-out" size={30} color="#ffffff" /></View>
                        <Text style={styles.iconText}>로그아웃</Text>
                    </TouchableOpacity>
                </View>
            </View>
          </View>
          <View style={styles.barContainer}>
            <Text style={{color: 'white', marginBottom: 5 }}>실시간 이용자수</Text>
            <View style={{flexDirection: 'row', backgroundColor: '#ffffff', width: '100%', height: 40, padding: 10, borderRadius: 10, justifyContent: 'center'}}>
                {memberInIpark < 20 ? (
                    <Progress.Bar
                      progress={memberInIpark / 50}
                      width={220}
                      height={20}
                      color={'green'}
                    />
                  ) : memberInIpark < 40 ? (
                    <Progress.Bar
                      progress={memberInIpark / 50}
                      width={220}
                      height={20}
                      color={'yellow'}
                    />
                  ) : (
                    <Progress.Bar
                      progress={memberInIpark / 50}
                      width={220}
                      height={20}
                      color={'red'}
                    />
                  )}
                <Text> {memberInIpark * 2}% </Text>
                <Text> {memberInIpark}명 / 50명</Text>
            </View>
            <Text style={{color: 'yellow', fontSize: 12, marginVertical: 10}}>
            * 사용 인원이 50명을 초과하면, 센터 이용에 불편함이 있을 수 있습니다. 이용하시기 전, 참고하신 후 이용하시길 바랍니다. </Text>
          </View>
          <View style={styles.noticeContainer}>
            <Text style={{color: 'white', marginBottom: 5}}>최근 공지사항</Text>
            <TouchableOpacity style={{backgroundColor: 'white', width: '100%', borderRadius: 10, height: 30, justifyContent: 'center', marginVertical: 5}}
                onPress={() => {
                    setSelectedId(data[0].id);
                    navigation.navigate('NoticeView', { id: data[0].id, title: data[0].title, paragraph: data[0].paragraph, image: data[0].image })
                }}>
                <Text style={{marginLeft: 10, fontSize: 12,}}>■ {data[0].title}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: 'white', width: '100%', borderRadius: 10, height: 30, justifyContent: 'center', marginVertical: 5}}
                onPress={() => {
                    setSelectedId(data[1].id);
                    navigation.navigate('NoticeView', { id: data[1].id, title: data[1].title, paragraph: data[1].paragraph, image: data[1].image })
                }}>
                <Text style={{marginLeft: 10, fontSize: 12,}}>■ {data[1].title}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: 'white', width: '100%', borderRadius: 10, height: 30, justifyContent: 'center', marginVertical: 5}}
                onPress={() => {
                    setSelectedId(data[2].id);
                    navigation.navigate('NoticeView', { id: data[2].id, title: data[2].title, paragraph: data[2].paragraph, image: data[2].image })
                }}>
                <Text style={{marginLeft: 10, fontSize: 12,}}>■ {data[2].title}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainter}>
              <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('infoIpark')}>
                <View style={styles.iconContainer}><Icon name="info-circle" size={30} color="#ffffff" /></View>
                <Text style={styles.iconText}>아이파크정보</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('statisticalStatus')}>
                <View style={styles.iconContainer}><Icon name="bar-chart" size={30} color="#ffffff" /></View>
                <Text style={styles.iconText}>통계현황</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuButton} onPress={() => Alert.alert('새로운 기능들과 함께 준비 중입니다.')}>
                <View style={styles.iconContainer}><Icon name="flask" size={30} color="#ffffff" /></View>
                <Text style={styles.iconText}>실험실</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuButton}
                onPress={() => Linking.openURL('mailto:cjh970422@korea.ac.kr')} title="support@example.com">
                <View style={styles.iconContainer}><Icon name="comments-o" size={30} color="#ffffff" /></View>
                <Text style={styles.iconText}>문의하기</Text>
              </TouchableOpacity>
          </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile:{
    width: 100, height: 100, borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileContainer: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topContainer: {
    flex: 6,
    backgroundColor: '#A33B39',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent : 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topContainerFirst: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  topContainerSecond: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 10,
  },
  menuButton: {
    backgroundColor: 'white',
    marginBottom: 10,
    marginHorizontal: 10,
    width: 80,
    height: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: '#A33B39',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText:{
    fontSize: 10,
    marginTop: 5,
    color: 'black',
  },
  barContainer: {
    flex: 3,
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',

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
  noticeContainer: {
    flex: 3,
    marginHorizontal: 10,
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',

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
  bottomContainter: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center',

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

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { Linking } from 'react-native';
import moment from 'moment-timezone';
import { BarChart, LineChart } from 'react-native-chart-kit';
import * as Progress from 'react-native-progress';
const statisticalStatus = ({navigation}) => {
    const [users, setUsers] = useState([]);
    const API_URL = 'https://cxz3619.pythonanywhere.com/covidRecord/';
    const [record, setrecord] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [recordAM, setrecordAM] = useState([0, 0, 0]);
    const [recordPM, setrecordPM] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

    const SVGHeight = 300;
    const SVGWidth = 300;

    useEffect(() => {
        try {
              fetch('https://cxz3619.pythonanywhere.com/liveData/')
                .then(response => response.json())
                .then(data => {
                  setUsers(data);
                });
            } catch (e) { throw e; }
        try {
          fetch(API_URL)
            .then(response => response.json())
            .then(data => {
              const mapping_data =data.filter(item => moment().add(-7,'d').format('YYYY/MM/DD')<=item.enter_time&&item.enter_time<=moment().format('YYYY/MM/DD'));
              var temp_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
              mapping_data.map(user => {

                if (
                  parseInt(user.enter_time.substring(11, 13), 10) >= 6 &&
                  parseInt(user.enter_time.substring(11, 13), 10) <= 8
                ) {
                  temp_arr[parseInt(user.enter_time.substring(11, 13), 10) - 6] += 1;
                }
                if (
                  parseInt(user.enter_time.substring(11, 13), 10) <= 21 &&
                  parseInt(user.enter_time.substring(11, 13), 10) >= 13
                ) {
                  temp_arr[parseInt(user.enter_time.substring(11, 13), 10) - 10] += 1;
                }
              });
              console.log('temp_arr:', temp_arr);
              setrecord(temp_arr);

              setrecordAM(temp_arr.slice(0, 3));
              setrecordPM(temp_arr.slice(3));
            });
        } catch (e) {
          console.log('error: ', e);
        }
      }, []);

    let memberInIpark = users.length
    return (
        <View style={{justifyContent: 'center', flexDirection: 'column', margin: 10, }}>
              <View>
              <Text style={{margin: 10, fontWeight: 'bold'}}>현재 센터 사용인원</Text>
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
              </View>
              <View>
                <Text style={{margin: 10, fontWeight: 'bold'}}>오전 센터 사용인원</Text>
                <LineChart
                  data={{
                    labels: [
                      // eslint-disable-next-line prettier/prettier
                      '07-08', '08-09', '09-10',
                    ],
                    datasets: [
                      {
                        data: recordAM,
                      },
                    ],
                  }}
                    width={Dimensions.get('window').width}
                    height={Dimensions.get('window').width / 2}
                  horizontalLabelRotation={0}
                  verticalLabelRotation={0}
                  showBarTops={false}
                  showValuesOnTopOfBars={true}
                  fromZero={true}
                  flatColor={true}
                  yAxisSuffix='명'
                  chartConfig={{
                    backgroundColor: 'black',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    fillShadowGradientOpacity: 1,
                    fillShadowGradient: '#A33B39',
                    decimalPlaces: 0,
                    barPercentage: 0.5,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                />
              </View>
              <View>
                <Text style={{margin: 10, fontWeight: 'bold'}}>오후 센터 사용인원</Text>
                <LineChart
                  data={{
                    labels: [
                      // eslint-disable-next-line prettier/prettier
                      '13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21', '21-22'
                    ],
                    datasets: [
                      {
                        data: recordPM,
                      },
                    ],
                  }}
                  width={Dimensions.get('window').width}
                  height={Dimensions.get('window').width / 2}
                  horizontalLabelRotation={0}
                  verticalLabelRotation={0}
                  showBarTops={false}
                  showValuesOnTopOfBars={true}
                  fromZero={true}
                  flatColor={true}
                  yAxisSuffix='명'
                  chartConfig={{
                    backgroundColor: 'black',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    fillShadowGradientOpacity: 1,
                    fillShadowGradient: '#A33B39',
                    decimalPlaces: 0,
                    barPercentage: 0.5,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                />
              </View>
            </View>
    );
};

const styles = StyleSheet.create({

});

export default statisticalStatus;

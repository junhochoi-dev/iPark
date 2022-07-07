import 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react';
import { View, StatusBar, StyleSheet, Dimensions, Text } from 'react-native';
import moment from 'moment-timezone';

import { BarChart } from 'react-native-chart-kit';

const GRAPH_MARGIN = 20;
const colors = {
  axis: '#E4E4E4',
};

const Chart = () => {
  const API_URL = 'https://cxz3619.pythonanywhere.com/covidRecord/';
  const [record, setrecord] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [recordAM, setrecordAM] = useState([0, 0, 0]);
  const [recordPM, setrecordPM] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);


  console.log('chart');

  const SVGHeight = 300;
  const SVGWidth = 300;

  useEffect(() => {
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

  return (
    <View style={{ flex: 1, paddingLeft: 5, paddingRight: 5, justifyContent: 'center', flexDirection: 'row'}}>
      <View>
        <Text style={{paddingLeft: 20, fontWeight: 'bold', textAlign: 'left',}}>AM</Text>
          <BarChart
              data={{
                labels: [
                  // eslint-disable-next-line prettier/prettier
                  '7시', '8시', '9시',
                ],
                datasets: [
                  {
                    data: recordAM,
                  },
                ],
              }}
                width={Dimensions.get('window').width / 2 - 80}
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
                barRadius: 3,
                barPercentage: 0.2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
            />
      </View>
      <View>
        <Text style={{paddingRight: 10, fontWeight: 'bold', textAlign: 'right'}}>PM</Text>
      <BarChart
          data={{
            labels: [
              // eslint-disable-next-line prettier/prettier
              '13시', '14시', '15시', '16시', '17시', '18시', '19시', '20시', '21시'
            ],
            datasets: [
              {
                data: recordPM,
              },
            ],
          }}
          width={Dimensions.get('window').width / 2 + 80}
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
            barRadius: 3,
            barPercentage: 0.2,
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

export default Chart;
